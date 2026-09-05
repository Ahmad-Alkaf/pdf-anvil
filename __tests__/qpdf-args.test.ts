import { describe, expect, it } from "vitest";
import { isEncryptedArgs, isQpdfOk, protectArgs, qpdfFailure, QPDF_IN, QPDF_OUT, unlockArgs } from "@/lib/pdf/qpdf-args";

describe("qpdf argument mapping", () => {
  it("decrypts with the given password", () => {
    expect(unlockArgs("s3cret")).toEqual(["--password=s3cret", "--decrypt", QPDF_IN, QPDF_OUT]);
  });

  it("checks encryption without a password", () => {
    expect(isEncryptedArgs()).toEqual(["--is-encrypted", QPDF_IN]);
  });

  it("encrypts with AES-256 and maps the permission flags", () => {
    expect(
      protectArgs({ userPassword: "open", ownerPassword: "own", allowPrinting: true, allowCopying: false, allowModifying: false }),
    ).toEqual([
      "--encrypt",
      "--user-password=open",
      "--owner-password=own",
      "--bits=256",
      "--print=full",
      "--modify=none",
      "--extract=n",
      "--",
      QPDF_IN,
      QPDF_OUT,
    ]);
    expect(protectArgs({ userPassword: "open", allowPrinting: false, allowCopying: true, allowModifying: true })).toEqual(
      expect.arrayContaining(["--print=none", "--modify=all", "--extract=y"]),
    );
  });

  it("uses the user password as owner password when none is given", () => {
    expect(protectArgs({ userPassword: "open", allowPrinting: true, allowCopying: true, allowModifying: true })).toContain(
      "--owner-password=open",
    );
    expect(
      protectArgs({ userPassword: "open", ownerPassword: "", allowPrinting: true, allowCopying: true, allowModifying: true }),
    ).toContain("--owner-password=open");
  });

  it("treats exit 0 and 3 (warnings) as success", () => {
    expect(isQpdfOk(0)).toBe(true);
    expect(isQpdfOk(3)).toBe(true);
    expect(isQpdfOk(2)).toBe(false);
  });
});

describe("qpdfFailure", () => {
  it("maps a wrong password", () => {
    expect(qpdfFailure(2, "qpdf: /job/in.pdf: invalid password").code).toBe("wrong-password");
  });

  it("maps a missing header and a damaged file", () => {
    expect(qpdfFailure(2, "WARNING: /job/in.pdf: can't find PDF header\nqpdf: /job/in.pdf: unable to find trailer dictionary").code).toBe(
      "not-pdf",
    );
    expect(qpdfFailure(2, "WARNING: /job/in.pdf: file is damaged\nqpdf: /job/in.pdf: unable to find trailer dictionary").code).toBe(
      "corrupt",
    );
  });

  it("keeps the last stderr line as detail for anything else, without the path prefix", () => {
    const err = qpdfFailure(2, "qpdf: /job/in.pdf: something unexpected happened");
    expect(err.code).toBe("unknown");
    expect(err.message).toBe("Something went wrong while processing the file. (something unexpected happened)");
    expect(qpdfFailure(2, "").message).toBe("Something went wrong while processing the file. (qpdf exit code 2)");
  });
});
