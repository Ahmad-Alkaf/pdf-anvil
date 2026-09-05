// Vietnamese tool pages. Slugs follow the most searched Vietnamese phrase
// (diacritics stripped); ids mirror the English slugs. Decisions are in NOTES.md.

import type { ToolFaq } from "@/lib/tools";
import type { LocalePage } from "../types";

const PRIVACY_FAQ: ToolFaq = {
  q: "File của tôi có bị tải lên máy chủ không?",
  a: "Không. PDF Anvil chạy hoàn toàn trong trình duyệt của bạn. File được JavaScript mở ngay trên thiết bị của bạn, và kết quả cũng được tạo tại đó. Không có gì được gửi đến chúng tôi. Bạn có thể ngắt kết nối internet sau khi trang tải xong, công cụ vẫn chạy bình thường.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "Có giới hạn dung lượng file hay số lần dùng mỗi ngày không?",
  a: "Không. Không giới hạn số trang, không giới hạn số file, không hạn mức mỗi ngày. Giới hạn duy nhất là bộ nhớ của thiết bị bạn. File trên 100 MB sẽ hiện cảnh báo, nhưng vẫn xử lý được trên hầu hết máy tính.",
};

const FREE_FAQ: ToolFaq = {
  q: "Có thật sự miễn phí không? Tôi có cần tài khoản không?",
  a: "Có, hoàn toàn miễn phí và không cần tài khoản. Không đăng ký, không email, không watermark, không gói trả phí. PDF Anvil là dự án phụ của KafLabs, được làm ra để hữu ích.",
};

const IMAGE_STEPS: [string, string, string] = [
  "Kéo thả một hoặc nhiều ảnh vào ô, hoặc nhấp để chọn.",
  "Kéo các ảnh vào đúng thứ tự và chọn khổ trang.",
  "Nhấp Tạo PDF. File được tải xuống ngay.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: "“Vừa với ảnh” nghĩa là gì?",
  a: "Mỗi trang có đúng kích thước của ảnh, không có lề. Dùng cho bản scan và ảnh chụp màn hình. Chọn A4 hoặc Letter khi bạn muốn trang in bình thường với ảnh nằm giữa.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "Tôi có thể đưa nhiều ảnh vào một file PDF không?",
  a: "Có. Thêm bao nhiêu ảnh tùy bạn. Mỗi ảnh thành một trang, theo thứ tự trong danh sách. Kéo ảnh lên hoặc xuống để đổi thứ tự.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Kéo thả file PDF vào ô, hoặc nhấp để chọn.",
  "Chọn định dạng ảnh và độ phân giải bạn cần.",
  "Nhấp Chuyển sang ảnh. File ZIP chứa tất cả ảnh được tải xuống ngay. Bạn cũng có thể tải từng ảnh riêng.",
];

const DPI_FAQ: ToolFaq = {
  q: "Tôi nên chọn độ phân giải nào?",
  a: "72 DPI cho file nhỏ, phù hợp với web. 150 DPI là lựa chọn tốt cho màn hình và slide. 300 DPI dành cho in ấn. DPI càng cao thì file càng lớn và xử lý càng lâu.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "Tôi có thể chỉ chuyển một trang không?",
  a: "Có. Sau khi file tải xong, nhấp vào các trang bạn muốn trong lưới. Chỉ những trang đã chọn mới được chuyển đổi.",
};

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "File PDF hay mật khẩu của tôi có bị tải lên không?",
  a: "Không. File và mật khẩu ở nguyên trong trình duyệt của bạn. Công cụ chạy chương trình mã nguồn mở qpdf dưới dạng WebAssembly ngay trên thiết bị của bạn. Không có yêu cầu mạng nào mang theo file hay mật khẩu. Bạn có thể ngắt kết nối internet sau khi trang tải xong, công cụ vẫn chạy bình thường.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "Mật khẩu người dùng và mật khẩu chủ sở hữu khác nhau thế nào?",
  a: "Một file PDF có thể có hai mật khẩu. Mật khẩu người dùng dùng để mở file. Mật khẩu chủ sở hữu cho toàn quyền truy cập và bỏ các giới hạn về in, sao chép và chỉnh sửa. Trình xem PDF chỉ áp dụng các quyền với người mở file bằng mật khẩu người dùng.",
};

export const pages: readonly LocalePage[] = [
  // ---- ghép ----
  {
    id: "merge-pdf",
    slug: "ghep-file-pdf",
    kind: "merge",
    nav: true,
    priority: 1,
    name: "Ghép file PDF",
    navLabel: "Ghép",
    title: "Ghép file PDF online – Miễn phí, riêng tư, không tải lên",
    description:
      "Ghép nhiều file PDF thành một tài liệu ngay trong trình duyệt. Kéo thả để sắp thứ tự. Miễn phí, không tải lên, không tài khoản, không giới hạn, không watermark.",
    h1: "Ghép file PDF",
    intro: "Ghép hai hay nhiều file PDF thành một file duy nhất. Kéo các file vào đúng thứ tự bạn muốn. Mọi thứ diễn ra ngay trong trình duyệt.",
    actionLabel: "Ghép PDF",
    steps: [
      "Kéo thả hai hay nhiều file PDF vào ô, hoặc nhấp để chọn.",
      "Kéo các file vào đúng thứ tự bạn muốn.",
      "Nhấp Ghép PDF. File đã ghép được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Làm sao để đổi thứ tự các file?",
        a: "Kéo file lên hoặc xuống trong danh sách, hoặc dùng các nút mũi tên. File PDF sau khi ghép đi theo đúng thứ tự trong danh sách, từ trên xuống dưới.",
      },
      {
        q: "Ghép file có làm giảm chất lượng trang không?",
        a: "Không. Các trang được sao chép nguyên vẹn. Phông chữ, ảnh và đồ họa vector giữ nguyên hoàn toàn. Công cụ không dựng lại hay nén bất cứ thứ gì.",
      },
      {
        q: "Tôi có thể ghép file PDF có mật khẩu không?",
        a: "Không ghép trực tiếp được. Hãy gỡ mật khẩu bằng công cụ Mở khóa PDF trước, rồi ghép bản sao đó. Bạn cần biết mật khẩu của file.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "image-to-pdf"],
    keywords: [
      "ghép file pdf",
      "ghep file pdf",
      "ghép pdf",
      "gộp file pdf",
      "nối file pdf",
      "ghép nhiều file pdf thành 1",
      "ghép file pdf online",
      "ghép pdf miễn phí",
    ],
  },
  {
    // Mirrors "combine-pdf" for the query "gộp file pdf".
    id: "combine-pdf",
    slug: "gop-file-pdf",
    kind: "merge",
    nav: false,
    priority: 12,
    name: "Gộp file PDF",
    navLabel: "Gộp",
    title: "Gộp file PDF thành một – Online, miễn phí, không tải lên",
    description:
      "Gộp nhiều file PDF thành một tài liệu bằng công cụ chạy ngay trong trình duyệt. Sắp thứ tự file, nhấp một lần, tải xuống. Không tải lên, không tài khoản.",
    h1: "Gộp file PDF thành một",
    intro:
      "Gộp hai hay nhiều file PDF lại thành một tài liệu. Thêm file, sắp thứ tự và tải kết quả xuống. File của bạn ở nguyên trên thiết bị.",
    actionLabel: "Gộp PDF",
    steps: [
      "Thêm các file PDF bạn muốn gộp. Kéo thả vào ô, hoặc nhấp để chọn.",
      "Sắp các file theo đúng thứ tự. Kéo file, hoặc dùng các nút mũi tên.",
      "Nhấp Gộp PDF. Trình duyệt tạo một file PDF và tải xuống.",
    ],
    faq: [
      {
        q: "Làm sao để gộp nhiều file PDF thành một?",
        a: "Mở trang này và thêm các file PDF của bạn. Sắp theo thứ tự. Nhấp Gộp PDF. Công cụ sao chép toàn bộ trang vào một file PDF mới và tải xuống. Không cần cài phần mềm nào.",
      },
      {
        q: "Công cụ gộp PDF này có miễn phí không?",
        a: "Có. Không mất phí, không tài khoản, không watermark, không giới hạn số file. Bạn dùng bao nhiêu lần tùy ý.",
      },
      {
        q: "Tôi có thể gộp file PDF trên điện thoại không?",
        a: "Có. Mở trang này trong trình duyệt trên điện thoại hoặc máy tính bảng. Chạm vào ô để chọn file. File PDF đã gộp được lưu vào thư mục tải xuống.",
      },
      {
        q: "Gộp, ghép và nối file PDF khác nhau thế nào?",
        a: "Không khác gì cả. Gộp, ghép và nối đều là một việc: đưa nhiều file PDF vào một file. Trang này và trang Ghép file PDF dùng cùng một công cụ.",
      },
      {
        q: "Các trang có giữ nguyên kích thước và chất lượng không?",
        a: "Có. Mỗi trang được sao chép nguyên vẹn. Không có gì bị dựng lại hay nén. Các trang khác khổ có thể nằm cạnh nhau trong cùng một file.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "extract-pdf-pages"],
    keywords: [
      "gộp file pdf",
      "gop file pdf",
      "gộp pdf",
      "gộp nhiều file pdf thành 1",
      "gộp file pdf online",
      "cách gộp file pdf",
      "nối pdf",
    ],
  },

  // ---- tách ----
  {
    id: "split-pdf",
    slug: "tach-file-pdf",
    kind: "split",
    nav: true,
    priority: 6,
    name: "Tách file PDF",
    navLabel: "Tách",
    title: "Tách file PDF online – Tách từng trang hoặc theo phạm vi trang",
    description:
      "Tách một file PDF thành nhiều file, mỗi trang một file, hoặc lấy các phạm vi trang như 1-3, 5, 8-. Chạy trong trình duyệt. Miễn phí, riêng tư, không tải lên.",
    h1: "Tách file PDF",
    intro:
      "Biến một file PDF thành nhiều file. Lưu mỗi trang thành một file riêng, hoặc nhập phạm vi trang bạn cần. File ở nguyên trên thiết bị của bạn.",
    actionLabel: "Tách PDF",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn.",
      "Chọn “Từng trang” hoặc nhập phạm vi trang như 1-3, 5, 8-.",
      "Nhấp Tách PDF. File ZIP chứa tất cả các phần được tải xuống ngay. Bạn cũng có thể tải từng phần riêng.",
    ],
    faq: [
      {
        q: "Làm sao để tách file PDF thành nhiều file riêng?",
        a: "Thêm file PDF và chọn “Từng trang”. Nhấp Tách PDF. Mỗi trang thành một file PDF riêng. Bạn nhận tất cả trong một file ZIP, hoặc tải từng file riêng.",
      },
      {
        q: "Nhập phạm vi trang như thế nào?",
        a: "Ngăn cách các mục bằng dấu phẩy. “3” là một trang. “1-3” là trang 1 đến 3. “8-” là từ trang 8 đến hết. Mỗi mục thành một file PDF riêng. Ví dụ: 1-3, 5, 8- tạo ra ba file.",
      },
      {
        q: "Làm sao để chỉ lấy một số trang trong file PDF?",
        a: "Chọn “Phạm vi trang” và nhập các trang bạn muốn, ví dụ 2, 7-9. Chỉ những trang đó được lưu. File gốc không thay đổi.",
      },
      {
        q: "Vì sao tôi nhận được file ZIP?",
        a: "Khi tách ra nhiều hơn một file, trình duyệt không thể lưu nhiều file cùng lúc mà không hỏi từng lần. File ZIP chứa tất cả các file đó. Bạn cũng có thể tải từng file riêng từ danh sách kết quả.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "tách file pdf",
      "tach file pdf",
      "tách pdf",
      "tách trang pdf",
      "tách file pdf thành nhiều file",
      "chia file pdf",
      "tách file pdf online",
      "tách pdf miễn phí",
    ],
  },
  {
    // Mirrors "extract-pdf-pages" for the query "cắt file pdf" / "cắt trang pdf".
    id: "extract-pdf-pages",
    slug: "cat-file-pdf",
    kind: "split",
    nav: false,
    priority: 16,
    name: "Cắt file PDF",
    navLabel: "Cắt trang",
    title: "Cắt trang PDF online – Lấy đúng các trang bạn cần, không tải lên",
    description:
      "Cắt các trang bạn cần ra khỏi file PDF và lưu thành file mới. Nhập số trang hoặc phạm vi trang. Chạy trong trình duyệt. Miễn phí, không tải lên, không tài khoản.",
    h1: "Cắt trang khỏi file PDF",
    intro:
      "Lấy đúng những trang bạn cần ra khỏi một file PDF và lưu thành file mới. Nhập số trang, nhấp một lần và tải xuống. File PDF không rời khỏi thiết bị của bạn.",
    actionLabel: "Cắt trang",
    steps: [
      "Thêm file PDF của bạn. Kéo thả vào ô, hoặc nhấp để chọn.",
      "Chọn “Phạm vi trang” và nhập các trang bạn muốn, ví dụ 2, 5-7, 10-. Hoặc chọn “Từng trang” để mỗi trang thành một file riêng.",
      "Nhấp Cắt trang. Mỗi phạm vi thành một file PDF. Bạn nhận được file ZIP, hoặc tải từng file riêng.",
    ],
    faq: [
      {
        q: "Làm sao để cắt một số trang trong file PDF?",
        a: "Thêm file PDF và chọn “Phạm vi trang”. Nhập số các trang bạn muốn. Nhấp Cắt trang. Chỉ những trang đó đi vào file mới. File PDF gốc không thay đổi.",
      },
      {
        q: "Tôi có thể cắt một trang duy nhất không?",
        a: "Có. Nhập một số trang, ví dụ 4. Công cụ lưu trang đó thành một file PDF mới chỉ có một trang.",
      },
      {
        q: "Tôi có thể lưu mỗi trang thành một file PDF riêng không?",
        a: "Có. Chọn “Từng trang”. Mỗi trang thành một file PDF riêng. Tất cả nằm trong một file ZIP, và bạn cũng có thể tải từng file một.",
      },
      {
        q: "Tôi có thể cắt các trang không liền nhau không?",
        a: "Có. Ngăn cách các mục bằng dấu phẩy, ví dụ 1, 4, 9-11. Mỗi mục thành một file. Nếu bạn muốn tất cả nằm trong một file, hãy cắt trước rồi gộp các file lại bằng công cụ Gộp file PDF.",
      },
      {
        q: "Công cụ cắt file PDF này có miễn phí không?",
        a: "Có. Không mất phí, không tài khoản, không watermark, không giới hạn số trang. File PDF được xử lý trong trình duyệt và không bao giờ được tải lên.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "combine-pdf"],
    keywords: [
      "cắt file pdf",
      "cat file pdf",
      "cắt trang pdf",
      "cắt pdf",
      "lấy trang trong file pdf",
      "trích xuất trang pdf",
      "cắt file pdf online",
    ],
  },

  // ---- xoay ----
  {
    id: "rotate-pdf",
    slug: "xoay-pdf",
    kind: "rotate",
    nav: true,
    priority: 10,
    name: "Xoay PDF",
    navLabel: "Xoay",
    title: "Xoay trang PDF online – Sửa trang bị nghiêng, miễn phí",
    description:
      "Xoay tất cả các trang hoặc từng trang PDF 90, 180 hay 270 độ và lưu kết quả. Chạy ngay trong trình duyệt. Miễn phí, không tải lên, không watermark.",
    h1: "Xoay trang PDF",
    intro:
      "Sửa các trang bị nằm ngang hoặc lộn ngược. Xoay cả tài liệu hoặc chỉ những trang bạn chọn, rồi lưu thành file PDF mới.",
    actionLabel: "Lưu PDF đã xoay",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn.",
      "Xoay tất cả các trang bằng các nút ở trên, hoặc di chuột lên một trang để chỉ xoay trang đó.",
      "Nhấp Lưu PDF đã xoay. File được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Xoay xong có được lưu vĩnh viễn không?",
        a: "Có. Khác với nút xoay trong trình xem PDF chỉ đổi cách hiển thị, công cụ này ghi góc xoay vào file. Trang mở đúng hướng mới trong mọi trình xem và trên mọi thiết bị.",
      },
      {
        q: "Tôi có thể chỉ xoay một trang không?",
        a: "Có. Di chuột lên ảnh thu nhỏ của trang và dùng các nút xoay của trang đó. Mỗi trang có thể có góc xoay riêng. Các nút ở trên xoay tất cả các trang cùng lúc.",
      },
      {
        q: "Xoay có làm giảm chất lượng không?",
        a: "Không. Công cụ chỉ đổi một thuộc tính của trang. Nội dung không bị dựng lại hay nén, nên chất lượng giữ nguyên.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: ["xoay pdf", "xoay file pdf", "xoay trang pdf", "xoay pdf và lưu", "cách xoay file pdf", "xoay pdf online miễn phí"],
  },

  // ---- sắp xếp ----
  {
    id: "organize-pdf",
    slug: "sap-xep-trang-pdf",
    kind: "organize",
    nav: true,
    priority: 11,
    name: "Sắp xếp trang PDF",
    navLabel: "Sắp xếp",
    title: "Sắp xếp trang PDF – Đổi thứ tự và xóa trang online",
    description:
      "Kéo các trang PDF sang thứ tự mới, xóa những trang không cần và tải kết quả xuống. Chạy ngay trong trình duyệt. Miễn phí, riêng tư, không tải lên, không giới hạn.",
    h1: "Sắp xếp trang PDF",
    intro:
      "Đổi thứ tự trang bằng cách kéo thả, xóa những trang không cần và lưu thành file PDF mới gọn gàng. Không có gì rời khỏi thiết bị của bạn.",
    actionLabel: "Lưu PDF đã sắp xếp",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn.",
      "Kéo các trang sang thứ tự mới. Di chuột lên một trang để xóa hoặc xoay trang đó.",
      "Nhấp Lưu PDF đã sắp xếp. File được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Làm sao để xóa trang trong file PDF?",
        a: "Di chuột lên trang và nhấp biểu tượng thùng rác. Trang đó bị loại khỏi kết quả. Trang đã xóa hoàn toàn không có trong file được lưu, nên file nhỏ đi.",
      },
      {
        q: "Tôi có thể đổi thứ tự trang trên điện thoại không?",
        a: "Có. Nhấn giữ một trang, rồi kéo đến vị trí mới. Nếu dùng bàn phím, hãy chọn trang bằng phím Tab, nhấn Space, di chuyển bằng các phím mũi tên, rồi nhấn Space lần nữa.",
      },
      {
        q: "Tôi lỡ xóa nhầm trang. Có hoàn tác được không?",
        a: "Có. Dùng nút Hoàn tác hiện ra sau khi xóa, hoặc nhấp Đặt lại để về thứ tự ban đầu với đầy đủ các trang.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: [
      "sắp xếp trang pdf",
      "sap xep trang pdf",
      "xóa trang pdf",
      "đổi thứ tự trang pdf",
      "xóa trang trong file pdf",
      "đảo trang pdf",
      "sắp xếp lại trang pdf",
    ],
  },

  // ---- ảnh sang PDF: một công cụ, bốn trang ----
  {
    id: "jpg-to-pdf",
    slug: "jpg-sang-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 13,
    name: "JPG sang PDF",
    navLabel: "JPG sang PDF",
    title: "JPG sang PDF – Chuyển ảnh JPG thành PDF online, miễn phí",
    description:
      "Chuyển ảnh chụp và bản scan JPG thành một file PDF ngay trong trình duyệt. Chọn khổ A4, Letter hoặc vừa với ảnh. Miễn phí, không tải lên, không watermark.",
    h1: "Chuyển JPG sang PDF",
    intro:
      "Chuyển một ảnh JPG hoặc cả bộ ảnh thành một file PDF duy nhất. Chọn khổ trang và kéo ảnh vào đúng thứ tự. Ảnh của bạn không bao giờ rời khỏi thiết bị.",
    actionLabel: "Tạo PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "File PDF có giữ nguyên chất lượng ảnh JPG không?",
        a: "Có. Dữ liệu JPG được đưa vào PDF nguyên vẹn, không nén lại. Ảnh 12 megapixel vẫn là ảnh 12 megapixel. File PDF nặng xấp xỉ tổng dung lượng các ảnh.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Ảnh chụp bằng điện thoại bị xoay ngang. Vì sao?",
        a: "Một số điện thoại lưu hướng xoay dưới dạng thẻ ẩn thay vì xoay điểm ảnh. Phiên bản này chưa đọc thẻ đó. Hãy mở ảnh trong một ứng dụng sửa ảnh bất kỳ, lưu lại một lần, rồi thêm lại.",
      },
      {
        q: "Tôi có thể trộn JPG với file PNG hoặc WebP không?",
        a: "Có. Cùng một công cụ nhận cả JPG, PNG và WebP. Mỗi ảnh thành một trang.",
      },
      PRIVACY_FAQ,
      {
        q: "Chuyển JPG sang PDF ở đây có miễn phí không?",
        a: "Có. Miễn phí, không giới hạn số ảnh, không watermark. File PDF được tạo trong trình duyệt, nên ảnh của bạn không bị tải lên. Bạn không cần tài khoản.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: [
      "jpg sang pdf",
      "chuyển jpg sang pdf",
      "chuyen jpg sang pdf",
      "đổi jpg sang pdf",
      "jpg to pdf",
      "jpeg sang pdf",
      "ảnh jpg sang pdf",
      "chuyển jpg sang pdf online",
    ],
  },
  {
    id: "png-to-pdf",
    slug: "png-sang-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 19,
    name: "PNG sang PDF",
    navLabel: "PNG sang PDF",
    title: "PNG sang PDF – Chuyển ảnh PNG thành PDF online, miễn phí",
    description:
      "Chuyển ảnh chụp màn hình, sơ đồ và đồ họa PNG thành một file PDF mà không giảm chất lượng. Giữ nền trong suốt. Miễn phí, trong trình duyệt, không tải lên.",
    h1: "Chuyển PNG sang PDF",
    intro:
      "Chuyển ảnh PNG thành PDF mà không giảm chất lượng. Ảnh chụp màn hình, biểu đồ và logo có nền trong suốt đều dùng được. Mọi thứ chạy ngay trong trình duyệt.",
    actionLabel: "Tạo PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Chuyển PNG sang PDF có giảm chất lượng không?",
        a: "Không. PNG là định dạng không mất dữ liệu và file PDF nhúng dữ liệu PNG nguyên vẹn. Chữ trong ảnh chụp màn hình vẫn nét, màu không bị lệch.",
      },
      {
        q: "Nền trong suốt thì sao?",
        a: "File PDF giữ kênh alpha. Vùng trong suốt hiện màu nền trang, thường là màu trắng trong hầu hết trình xem. Không có gì bị làm phẳng hay tô đầy.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Khổ trang nào phù hợp nhất với ảnh chụp màn hình?",
        a: "Dùng “Vừa với ảnh” để mỗi trang có đúng kích thước điểm ảnh của ảnh chụp màn hình, không có lề. Dùng A4 hoặc Letter nếu bạn muốn in các trang.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png sang pdf", "chuyển png sang pdf", "chuyen png sang pdf", "png to pdf", "ảnh chụp màn hình sang pdf", "chuyển png sang pdf online"],
  },
  {
    id: "image-to-pdf",
    slug: "anh-sang-pdf",
    kind: "images-to-pdf",
    nav: true,
    priority: 2,
    name: "Ảnh sang PDF",
    navLabel: "Ảnh sang PDF",
    title: "Chuyển ảnh sang PDF – JPG, PNG, WebP thành PDF, miễn phí",
    description:
      "Chuyển mọi loại ảnh thành một file PDF: JPG, PNG và WebP, trộn lẫn được. Chọn khổ trang và thứ tự. Miễn phí, riêng tư, chạy ngay trong trình duyệt, không tải lên.",
    h1: "Chuyển ảnh sang PDF",
    intro:
      "Gộp ảnh JPG, PNG và WebP thành một file PDF duy nhất. Trộn định dạng thoải mái, chọn khổ trang và kéo ảnh vào đúng thứ tự. Không có gì rời khỏi thiết bị của bạn.",
    actionLabel: "Tạo PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Định dạng ảnh nào dùng được?",
        a: "JPG, PNG và WebP. JPG và PNG được nhúng trực tiếp. WebP được giải mã và chuyển sang PNG trước khi thêm vào. Bạn có thể trộn cả ba trong một file PDF.",
      },
      {
        q: "Tôi có thể tạo PDF từ ảnh trên điện thoại không?",
        a: "Có. Mở trang này trên điện thoại, chạm vào ô và chọn ảnh từ thư viện. File PDF được tạo ngay trên điện thoại và lưu vào thư mục tải xuống.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "File PDF có giữ nguyên độ phân giải của ảnh không?",
        a: "Có. Dữ liệu ảnh được nhúng mà không lấy mẫu lại. Điều đó cũng có nghĩa là file PDF nặng xấp xỉ tổng dung lượng các ảnh.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: [
      "chuyển ảnh sang pdf",
      "chuyen anh sang pdf",
      "ảnh sang pdf",
      "chuyển hình ảnh sang pdf",
      "đổi ảnh sang pdf",
      "tạo file pdf từ ảnh",
      "chuyển ảnh sang pdf online",
      "chuyển ảnh sang pdf miễn phí",
    ],
  },
  {
    id: "scan-to-pdf",
    slug: "scan-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 18,
    name: "Scan sang PDF",
    navLabel: "Scan sang PDF",
    title: "Scan tài liệu sang PDF online – Dùng camera điện thoại, miễn phí",
    description:
      "Scan giấy tờ thành file PDF bằng camera điện thoại hoặc ảnh có sẵn. Sắp thứ tự trang và chọn khổ A4 hoặc Letter. Miễn phí, riêng tư, không có gì được tải lên.",
    h1: "Scan tài liệu sang PDF",
    intro:
      "Chụp từng trang bằng camera điện thoại, hoặc thêm ảnh bạn đã có sẵn. Sắp thứ tự trang và nhận một file PDF. Không có gì được tải lên.",
    actionLabel: "Tạo PDF",
    steps: [
      "Chạm Chụp ảnh và chụp trang đầu tiên. Hoặc chạm vào ô để thêm ảnh có sẵn.",
      "Lặp lại cho từng trang. Kéo các trang vào đúng thứ tự và chọn khổ trang.",
      "Chạm Tạo PDF. File được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Làm sao để scan tài liệu bằng điện thoại?",
        a: "Mở trang này trên điện thoại. Chạm Chụp ảnh. Camera mở ra. Chụp trang đầu tiên và xác nhận. Chạm Chụp ảnh lần nữa cho trang tiếp theo. Khi tất cả các trang đã có trong danh sách, chạm Tạo PDF. File PDF được lưu trên điện thoại của bạn.",
      },
      {
        q: "Tôi có thể dùng trên máy tính không?",
        a: "Có. Trên máy tính, nút Chụp ảnh mở hộp chọn file thông thường. Chọn ảnh hoặc bản scan đã có trên máy, sắp thứ tự và tạo file PDF.",
      },
      {
        q: "Ảnh của tôi có bị tải lên máy chủ không?",
        a: "Không. Ảnh đi thẳng từ camera điện thoại vào trang trong trình duyệt. File PDF cũng được tạo tại đó. Không có gì được gửi đến chúng tôi. Bạn có thể ngắt kết nối internet sau khi trang tải xong, công cụ vẫn chạy bình thường.",
      },
      {
        q: "Làm sao để trang scan thẳng và dễ đọc?",
        a: "Đặt tài liệu trên mặt phẳng với nền trơn. Dùng ánh sáng tốt và tránh bóng của tay hay điện thoại. Giữ điện thoại song song với trang và để trang chiếm trọn khung hình. Chạm vào màn hình để lấy nét trước khi chụp. Công cụ không cắt hay nắn thẳng ảnh.",
      },
      {
        q: "Tôi nên chọn khổ trang nào?",
        a: "Chọn A4 hoặc Letter để có trang in bình thường với ảnh nằm giữa. A4 là mặc định. Chọn “Vừa với ảnh” để mỗi trang có đúng kích thước của ảnh, không có lề.",
      },
      {
        q: "Tôi có thể scan nhiều trang vào một file PDF không?",
        a: "Có. Chụp mỗi trang một ảnh. Mỗi ảnh thành một trang theo thứ tự trong danh sách. Không giới hạn số trang. Kéo trang lên hoặc xuống để đổi thứ tự.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: [
      "scan pdf",
      "scan tài liệu sang pdf",
      "scan giấy tờ thành pdf",
      "scan pdf bằng điện thoại",
      "chụp ảnh thành pdf",
      "quét tài liệu sang pdf",
      "cách scan tài liệu thành file pdf",
    ],
    defaults: { pageSize: "a4" },
    capture: true,
  },

  // ---- PDF sang ảnh: một công cụ, ba trang ----
  {
    id: "pdf-to-jpg",
    slug: "pdf-sang-jpg",
    kind: "pdf-to-images",
    nav: false,
    priority: 14,
    name: "PDF sang JPG",
    navLabel: "PDF sang JPG",
    title: "PDF sang JPG – Chuyển trang PDF thành ảnh JPG online",
    description:
      "Xuất từng trang PDF thành ảnh JPG ở 72, 150 hoặc 300 DPI. Chạy ngay trong trình duyệt. Miễn phí, riêng tư, không tải lên, không watermark, không giới hạn.",
    h1: "Chuyển PDF sang JPG",
    intro:
      "Lưu mỗi trang PDF thành một ảnh JPG. Chọn độ phân giải, chọn trang và tải một ảnh hoặc tất cả dưới dạng ZIP.",
    actionLabel: "Chuyển sang ảnh",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Làm sao để lưu file PDF thành ảnh JPG?",
        a: "Thêm file PDF vào trang này. Giữ định dạng JPG và chọn độ phân giải. Nhấp Chuyển sang ảnh. Mỗi trang được lưu thành một file JPG. Tải từng ảnh hoặc tải tất cả trong một file ZIP.",
      },
      DPI_FAQ,
      {
        q: "Khi nào nên chọn JPG thay vì PNG?",
        a: "JPG nhẹ hơn và phù hợp với ảnh chụp và trang scan. Chuyển sang PNG cho chữ, sơ đồ và ảnh chụp màn hình cần đường nét sắc.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "Ảnh JPG có chứa toàn bộ trang không?",
        a: "Có. Cả trang được dựng đầy đủ, gồm ảnh, đồ họa vector và chữ, đúng như trình xem PDF hiển thị. Các ô biểu mẫu và ghi chú cũng có mặt như khi hiển thị.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: [
      "pdf sang jpg",
      "chuyển pdf sang jpg",
      "chuyen pdf sang jpg",
      "pdf to jpg",
      "đổi pdf sang jpg",
      "lưu pdf thành jpg",
      "pdf sang jpeg",
      "chuyển pdf sang jpg online",
    ],
  },
  {
    id: "pdf-to-png",
    slug: "pdf-sang-png",
    kind: "pdf-to-images",
    nav: false,
    priority: 20,
    name: "PDF sang PNG",
    navLabel: "PDF sang PNG",
    title: "PDF sang PNG – Chuyển trang PDF thành ảnh PNG online",
    description:
      "Xuất trang PDF thành ảnh PNG không giảm chất lượng ở 72, 150 hoặc 300 DPI. Chữ và sơ đồ sắc nét. Chạy trong trình duyệt. Miễn phí, riêng tư, không tải lên.",
    h1: "Chuyển PDF sang PNG",
    intro:
      "Lưu các trang PDF thành ảnh PNG không giảm chất lượng. Chữ, sơ đồ và ảnh chụp màn hình vẫn sắc nét. Chọn độ phân giải và trang, rồi tải xuống.",
    actionLabel: "Chuyển sang ảnh",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Vì sao nên chọn PNG thay vì JPG?",
        a: "PNG không mất dữ liệu. Viền chữ, nét mảnh và mảng màu phẳng giữ nguyên, không có vết nén. Đây là lựa chọn đúng cho slide, sơ đồ, biểu mẫu và bất cứ thứ gì bạn định sửa tiếp.",
      },
      DPI_FAQ,
      {
        q: "Nền ảnh PNG có trong suốt không?",
        a: "Không. Trang PDF mặc định có nền trắng, và ảnh PNG giữ nền đó. Hãy dùng ứng dụng sửa ảnh nếu bạn cần bỏ nền.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "File PNG có nặng hơn JPG không?",
        a: "Thường là có. PNG lưu từng điểm ảnh không mất dữ liệu, nên trang có ảnh chụp có thể nặng gấp vài lần bản JPG. Với trang chữ và sơ đồ thì chênh lệch không nhiều.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf sang png", "chuyển pdf sang png", "chuyen pdf sang png", "pdf to png", "pdf sang png độ phân giải cao", "chuyển pdf sang png online"],
  },
  {
    id: "pdf-to-image",
    slug: "pdf-sang-anh",
    kind: "pdf-to-images",
    nav: true,
    priority: 4,
    name: "PDF sang ảnh",
    navLabel: "PDF sang ảnh",
    title: "Chuyển PDF sang ảnh – Trang PDF thành JPG hoặc PNG online",
    description:
      "Chuyển trang PDF thành ảnh. Chọn JPG hoặc PNG và 72, 150 hay 300 DPI. Chọn đúng những trang bạn cần. Miễn phí, trong trình duyệt, không tải lên, không giới hạn.",
    h1: "Chuyển PDF sang ảnh",
    intro:
      "Biến các trang PDF thành file ảnh. Chọn JPG cho ảnh chụp và bản scan hoặc PNG cho chữ và sơ đồ, chọn độ phân giải và tải những trang bạn cần.",
    actionLabel: "Chuyển sang ảnh",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "JPG hay PNG?",
        a: "JPG nhẹ hơn và phù hợp với ảnh chụp và trang scan. PNG không giảm chất lượng và phù hợp với chữ, sơ đồ và ảnh chụp màn hình cần đường nét sắc.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "Tôi có thể lấy một ảnh cho cả tài liệu không?",
        a: "Mỗi trang thành một ảnh riêng. Nếu bạn cần một ảnh dài duy nhất, hãy chuyển các trang rồi ghép lại trong ứng dụng sửa ảnh.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: [
      "chuyển pdf sang ảnh",
      "chuyen pdf sang anh",
      "pdf sang ảnh",
      "chuyển file pdf sang ảnh",
      "đổi pdf sang hình ảnh",
      "xuất pdf ra ảnh",
      "chuyển pdf sang ảnh online",
    ],
  },

  // ---- nén: một công cụ, hai trang ----
  {
    id: "compress-pdf",
    slug: "nen-pdf",
    kind: "compress",
    nav: true,
    priority: 3,
    name: "Nén PDF",
    navLabel: "Nén",
    title: "Nén PDF online – Giảm dung lượng file PDF miễn phí, không tải lên",
    description:
      "Nén file PDF ngay trong trình duyệt. Chọn mức không giảm chất lượng, cân bằng hoặc nhỏ nhất. Ảnh lớn được nén lại, chữ vẫn nét. Miễn phí, không tải lên.",
    h1: "Nén PDF",
    intro:
      "Làm file PDF nhỏ hơn. Chọn mức nén, nhấp một lần và tải xuống. Chữ và đồ họa vector vẫn sắc nét. File không bao giờ rời khỏi thiết bị của bạn.",
    actionLabel: "Nén PDF",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn.",
      "Chọn mức nén. Không giảm chất lượng giữ nguyên từng điểm ảnh. Cân bằng là lựa chọn tốt nhất cho hầu hết file. Nhỏ nhất cho file nhỏ nhất.",
      "Nhấp Nén PDF. Công cụ hiện dung lượng cũ và mới, và file được tải xuống ngay.",
    ],
    faq: [
      {
        q: "File PDF của tôi sẽ nhỏ đi bao nhiêu?",
        a: "Tùy vào nội dung file. File PDF đầy ảnh chụp hoặc bản scan có thể giảm 50 đến 90 phần trăm với mức Cân bằng. File chỉ có chữ và đồ họa vector giảm ít hơn nhiều, thường 5 đến 20 phần trăm, vì không có gì lớn để nén lại. Công cụ hiện dung lượng cũ và mới sau mỗi lần chạy.",
      },
      {
        q: "Tôi nên chọn mức nào?",
        a: "Cân bằng là lựa chọn tốt nhất cho hầu hết file. Mức này giới hạn ảnh ở 1600 điểm ảnh cạnh dài, đủ nét trên màn hình và in thường. Chọn Nhỏ nhất cho file đính kèm email và các trang có giới hạn tải lên. Mức này giới hạn ảnh ở 1100 điểm ảnh và nén JPEG mạnh hơn. Chọn Không giảm chất lượng khi ảnh phải giữ nguyên hoàn toàn. Mức này chỉ dọn dẹp cấu trúc file và xóa dữ liệu thừa.",
      },
      {
        q: "Nén có làm giảm chất lượng chữ không?",
        a: "Không. Chữ, phông chữ, đường kẻ và đồ họa vector không thay đổi ở mọi mức. Chỉ ảnh chụp và bản scan lớn được nén lại, và chỉ ở mức Cân bằng và Nhỏ nhất. Nếu ảnh mới không nhỏ hơn ảnh cũ, ảnh cũ được giữ lại.",
      },
      {
        q: "Vì sao file của tôi không nhỏ đi?",
        a: "Một số file vốn đã nhỏ hết mức. Ảnh trong file đã là JPEG nhỏ, hoặc file không có ảnh nào, chỉ có chữ và hình vector. File đã được công cụ khác nén trước cũng thay đổi rất ít. Khi đó công cụ báo rằng file vốn đã gọn.",
      },
      {
        q: "Công cụ nén những ảnh nào?",
        a: "Ảnh JPEG và ảnh RGB hoặc thang xám không nén hay nén Flate, có dung lượng từ 64 KB và rộng hoặc cao từ 200 điểm ảnh. Ảnh có nền trong suốt, màu chỉ mục, CMYK hoặc không gian màu lạ được giữ nguyên để màu không bị sai.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: ["nén pdf", "nen pdf", "nén file pdf", "giảm dung lượng pdf", "nén pdf online", "nén file pdf miễn phí", "thu nhỏ file pdf"],
  },
  {
    // Mirrors "reduce-pdf-size" for the query "giảm dung lượng pdf".
    id: "reduce-pdf-size",
    slug: "giam-dung-luong-pdf",
    kind: "compress",
    nav: false,
    priority: 15,
    name: "Giảm dung lượng PDF",
    navLabel: "Giảm dung lượng",
    title: "Giảm dung lượng file PDF online – Miễn phí, không tải lên",
    description:
      "Giảm dung lượng file PDF để gửi email hoặc tải lên nơi có giới hạn. Chạy trong trình duyệt. Ba mức nén, hiện dung lượng trước và sau. Không tải lên, không tài khoản.",
    h1: "Giảm dung lượng file PDF",
    intro:
      "Đưa file PDF xuống dưới giới hạn của email hoặc trang tải lên. Chọn mức cần giảm, nhấp một lần và xem dung lượng cũ và mới. File PDF ở nguyên trên thiết bị của bạn.",
    actionLabel: "Giảm dung lượng",
    steps: [
      "Thêm file PDF của bạn. Kéo thả vào ô, hoặc nhấp để chọn.",
      "Chọn mức nén. Bắt đầu với Cân bằng. Nếu file vẫn còn lớn, chạy lại với Nhỏ nhất.",
      "Nhấp Giảm dung lượng. Công cụ hiện số phần trăm đã giảm, và file nhỏ hơn được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Làm sao để giảm dung lượng file PDF?",
        a: "Thêm file PDF vào trang này và chọn mức nén. Nhấp Giảm dung lượng. Công cụ ghi lại file, xóa dữ liệu thừa và thu nhỏ ảnh lớn. File PDF mới được tải xuống ngay, và trang hiện dung lượng cũ và mới.",
      },
      {
        q: "Làm sao để file PDF dưới 1 MB hoặc dưới 5 MB?",
        a: "Chạy file với mức Cân bằng và xem dung lượng mới. Nếu vẫn trên giới hạn, chạy lại với Nhỏ nhất. Nếu file vẫn quá lớn, nghĩa là file có nhiều trang ảnh. Hãy tách thành nhiều phần bằng công cụ Tách file PDF và gửi từng phần.",
      },
      {
        q: "Giảm dung lượng có làm thay đổi chữ không?",
        a: "Không. Chữ và đồ họa vector được sao chép nguyên vẹn. Chỉ ảnh chụp và bản scan lớn bị thu nhỏ. Chữ vẫn nét trên màn hình và khi in.",
      },
      {
        q: "Vì sao file PDF của tôi nặng như vậy?",
        a: "Trong hầu hết trường hợp, file chứa ảnh chụp hoặc trang scan ở độ phân giải rất cao. Một trang scan ở 600 DPI có thể chiếm vài megabyte. Mức Cân bằng giới hạn ảnh ở 1600 điểm ảnh cạnh dài, đủ để đọc và in thường.",
      },
      {
        q: "Công cụ giảm dung lượng PDF này có miễn phí không?",
        a: "Có. Không mất phí, không tài khoản, không watermark, không giới hạn số file. File PDF được xử lý trong trình duyệt và không bao giờ được tải lên.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "giảm dung lượng pdf",
      "giam dung luong pdf",
      "giảm dung lượng file pdf",
      "giảm kích thước file pdf",
      "cách giảm dung lượng file pdf",
      "giảm dung lượng pdf online",
      "pdf dưới 1mb",
    ],
  },

  // ---- mật khẩu: qpdf dưới dạng WebAssembly ----
  {
    id: "unlock-pdf",
    slug: "mo-khoa-pdf",
    kind: "unlock",
    nav: true,
    priority: 8,
    name: "Mở khóa PDF",
    navLabel: "Mở khóa",
    title: "Mở khóa PDF – Gỡ mật khẩu file PDF online, miễn phí, không tải lên",
    description:
      "Gỡ mật khẩu khỏi file PDF khi bạn biết mật khẩu. Nhập mật khẩu, nhấp một lần và nhận bản sao mở không cần mật khẩu. Miễn phí, trong trình duyệt, không tải lên.",
    h1: "Mở khóa file PDF",
    intro:
      "Gỡ mật khẩu khỏi file PDF. Nhập mật khẩu bạn biết, nhấp một lần và tải xuống bản sao mở không cần mật khẩu. File ở nguyên trên thiết bị của bạn.",
    actionLabel: "Mở khóa PDF",
    steps: [
      "Kéo thả file PDF có mật khẩu vào ô, hoặc nhấp để chọn.",
      "Nhập mật khẩu của file. Mật khẩu mở file hay mật khẩu chủ sở hữu đều được.",
      "Nhấp Mở khóa PDF. Bản sao không mật khẩu và không giới hạn được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Tôi quên mật khẩu. Các bạn có gỡ được không?",
        a: "Không. Công cụ cần mật khẩu. Công cụ không đoán, không bẻ khóa, không vượt qua mật khẩu. File PDF mã hóa AES không thể mở nếu không có đúng mật khẩu. Nếu bạn không biết, hãy hỏi người tạo file.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "Tôi nhập mật khẩu nào ở đây?",
        a: "Mật khẩu nào cũng được. Nếu bạn chỉ biết mật khẩu mở file, nhập mật khẩu đó. Nếu bạn biết mật khẩu chủ sở hữu, nhập mật khẩu đó. Kết quả không có mật khẩu và không giới hạn.",
      },
      {
        q: "Vì sao file PDF của tôi không mở được ở đây?",
        a: "Có ba nguyên nhân thường gặp. Mật khẩu sai: kiểm tra chữ hoa và dấu cách, rồi thử lại. File bị hỏng: mở trong một trình xem PDF để kiểm tra. File dùng chứng chỉ hoặc hệ thống quản lý bản quyền số thay vì mật khẩu: công cụ không mở được những file đó.",
      },
      {
        q: "Tôi có thể chỉ bỏ giới hạn mà vẫn giữ mật khẩu mở file không?",
        a: "Không. Kết quả không có mật khẩu nào cả. Để đặt mật khẩu mới, hãy mở file kết quả trong công cụ Đặt mật khẩu PDF.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: [
      "mở khóa pdf",
      "mo khoa pdf",
      "gỡ mật khẩu pdf",
      "xóa mật khẩu pdf",
      "bỏ mật khẩu file pdf",
      "mở file pdf có mật khẩu",
      "giải mã pdf",
      "mở khóa pdf online",
    ],
  },
  {
    id: "protect-pdf",
    slug: "dat-mat-khau-pdf",
    kind: "protect",
    nav: true,
    priority: 9,
    name: "Đặt mật khẩu PDF",
    navLabel: "Đặt mật khẩu",
    title: "Đặt mật khẩu cho PDF – Bảo vệ file PDF online, miễn phí, không tải lên",
    description:
      "Đặt mật khẩu cho file PDF với mã hóa AES-256 ngay trong trình duyệt. Chọn ai được in, sao chép hay sửa file. Miễn phí, không tải lên, không tài khoản.",
    h1: "Đặt mật khẩu bảo vệ file PDF",
    intro:
      "Thêm mật khẩu cho file PDF. File được mã hóa AES-256 ngay trong trình duyệt, chỉ người có mật khẩu mới mở được. Không có gì được tải lên.",
    actionLabel: "Bảo vệ PDF",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn.",
      "Nhập mật khẩu mở file. Đặt thêm mật khẩu chủ sở hữu và các quyền nếu bạn cần.",
      "Nhấp Bảo vệ PDF. File đã mã hóa được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Công cụ dùng mã hóa nào?",
        a: "AES-256, mã hóa mạnh nhất trong chuẩn PDF (PDF 2.0). Mọi trình xem PDF hiện tại đều mở được: Adobe Reader, Chrome, Edge, Firefox, Safari và Preview trên Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "Nếu tôi để trống mật khẩu chủ sở hữu thì sao?",
        a: "Công cụ dùng mật khẩu mở file cho cả hai. Khi đó các quyền không giới hạn được người đã biết mật khẩu đó. Hãy đặt mật khẩu chủ sở hữu khác khi bạn cần các quyền có hiệu lực.",
      },
      {
        q: "Các quyền có tác dụng gì?",
        a: "Các quyền cho trình xem PDF biết người mở file bằng mật khẩu người dùng được làm gì: in file, sao chép chữ và ảnh, sửa file. Người có mật khẩu chủ sở hữu làm được mọi thứ. Hầu hết trình xem tuân theo các quyền, nhưng đó là tín hiệu, không phải ổ khóa. Mật khẩu mới là lớp bảo vệ thật sự.",
      },
      {
        q: "Sau này tôi có gỡ mật khẩu được không?",
        a: "Có. Mở file trong công cụ Mở khóa PDF và nhập mật khẩu. Bạn nhận được bản sao không mật khẩu. Hãy giữ mật khẩu ở nơi an toàn. Không có mật khẩu thì không mở được file.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "Mật khẩu nên dài bao nhiêu?",
        a: "Dùng ít nhất 12 ký tự gồm chữ, số và ký hiệu. AES-256 rất mạnh, nhưng một chương trình có thể đoán được mật khẩu ngắn. Đừng gửi mật khẩu trong cùng email với file.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: [
      "đặt mật khẩu pdf",
      "dat mat khau pdf",
      "đặt mật khẩu cho file pdf",
      "bảo vệ pdf",
      "khóa file pdf",
      "mã hóa pdf",
      "cài mật khẩu file pdf",
      "đặt mật khẩu pdf online",
    ],
  },

  // ---- đọc: chỉ hiển thị file, không tạo kết quả ----
  {
    id: "pdf-viewer",
    slug: "doc-pdf",
    kind: "view",
    nav: true,
    priority: 7,
    name: "Đọc PDF",
    navLabel: "Đọc",
    title: "Mở file PDF online – Trình đọc PDF miễn phí, không tải lên",
    description:
      "Mở và đọc file PDF ngay trong trình duyệt. Cuộn trang, phóng to và in. Trình đọc PDF miễn phí, không tải lên, không tài khoản, không cần cài phần mềm Adobe.",
    h1: "Mở và đọc file PDF",
    intro:
      "Mở file PDF và đọc ngay trong trình duyệt. Cuộn qua các trang, phóng to và in. File ở nguyên trên thiết bị của bạn.",
    actionLabel: "In",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn.",
      "Cuộn qua các trang. Dùng thanh công cụ để đến một trang, phóng to, thu nhỏ hoặc vừa trang với chiều rộng cửa sổ.",
      "Nhấp In để mở file trong tab mới và in từ trình duyệt. Nhấp dấu X cạnh tên file để mở file khác.",
    ],
    faq: [
      {
        q: "Làm sao để mở file PDF không cần Adobe?",
        a: "Kéo thả file vào trang này, hoặc nhấp vào ô và chọn file. Bạn không cần Adobe Acrobat hay Adobe Reader. Trang này hiển thị PDF bằng cùng công nghệ mã nguồn mở mà Firefox dùng. Chạy được trên Chrome, Edge, Firefox và Safari. Không cần cài gì.",
      },
      {
        q: "Trình đọc PDF là gì?",
        a: "Trình đọc PDF là chương trình mở file PDF và hiển thị các trang trên màn hình. Adobe Reader là một ví dụ. Hầu hết trình duyệt cũng có sẵn một trình đọc. Trang này là trình đọc PDF chạy dưới dạng trang web. Nó hiển thị từng trang trong trình duyệt và không gửi file đi đâu cả.",
      },
      {
        q: "File PDF có bị tải lên khi tôi mở không?",
        a: "Không. File được JavaScript đọc ngay trên thiết bị của bạn và hiển thị trên màn hình tại đó. Không có gì được gửi đến máy chủ. Bạn có thể kiểm tra trong tab Network của công cụ nhà phát triển trên trình duyệt: không có yêu cầu nào mang theo file của bạn.",
      },
      {
        q: "Trình đọc có chạy khi không có mạng không?",
        a: "Gần như có. File được mở trong trình duyệt và không có dữ liệu nào đến máy chủ. Mã của trình đọc và một số phông chữ được tải từ trang của chúng tôi khi cần lần đầu. Hãy mở trang và một file khi đang có mạng. Sau đó bạn có thể mở thêm file mà không cần mạng cho đến khi đóng tab.",
      },
      {
        q: "Tôi có thể in file PDF không?",
        a: "Có. Nhấp In trên thanh công cụ. File mở trong tab mới bằng trình xem PDF của trình duyệt. Nhấn Ctrl+P (Cmd+P trên Mac) ở đó để in. Trình duyệt in file gốc, nên chữ vẫn nét trên giấy.",
      },
      {
        q: "Tôi có thể phóng to không?",
        a: "Có. Dùng nút cộng và trừ trên thanh công cụ, hoặc nhấp Vừa chiều rộng để trang rộng bằng cửa sổ. Mỗi trang được dựng lại ở kích thước mới, nên chữ vẫn nét ở mọi mức phóng.",
      },
      {
        q: "Tôi có thể sửa file PDF ở đây không?",
        a: "Không. Công cụ này chỉ hiển thị file. Để thêm chữ, ô che trắng, ảnh hoặc chữ ký lên trang, hãy dùng công cụ Chỉnh sửa PDF. Để xoay, sắp xếp, xóa, tách, ghép hay chuyển đổi trang, hãy dùng các công cụ khác trên trang này.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "đọc pdf",
      "doc pdf",
      "mở file pdf",
      "đọc file pdf online",
      "xem pdf online",
      "phần mềm đọc pdf",
      "mở pdf không cần adobe",
      "đọc pdf miễn phí",
    ],
  },

  // ---- chỉnh sửa: một công cụ, hai trang ----
  {
    id: "edit-pdf",
    slug: "chinh-sua-pdf",
    kind: "edit",
    nav: true,
    priority: 5,
    name: "Chỉnh sửa PDF",
    navLabel: "Chỉnh sửa",
    title: "Chỉnh sửa PDF online – Thêm chữ, che trắng, ảnh, miễn phí, không tải lên",
    description:
      "Chỉnh sửa file PDF ngay trong trình duyệt: thêm chữ, che trắng, tô sáng, chèn ảnh và vẽ chữ ký. Miễn phí, không tải lên, không tài khoản, không watermark.",
    h1: "Chỉnh sửa file PDF",
    intro:
      "Thêm chữ, ô che trắng, tô sáng, ảnh và chữ ký vẽ tay lên các trang PDF. Công cụ không sửa chữ có sẵn trong file mà đặt nội dung mới đè lên. Mọi thứ chạy ngay trong trình duyệt.",
    actionLabel: "Lưu PDF",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn. Chọn một trang trong dải bên trái.",
      "Chọn một công cụ trên thanh công cụ. Nhấp vào trang để thêm hộp văn bản, kéo để vẽ ô che trắng hoặc tô sáng, thêm ảnh, hoặc vẽ bằng bút. Kéo một mục để di chuyển, kéo góc để đổi kích thước, nhấn Delete để xóa.",
      "Nhấp Lưu PDF. File đã sửa được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Tôi có thể sửa gì trong file PDF với công cụ này?",
        a: "Bạn có thể đặt nội dung mới lên bất kỳ trang nào: hộp văn bản, ô trắng (che trắng), tô sáng màu vàng, ảnh (PNG hoặc JPG) và nét vẽ tay bằng chuột hoặc ngón tay. Bạn có thể di chuyển, đổi kích thước và xóa từng mục trước khi lưu. Nội dung gốc của trang vẫn nằm bên dưới.",
      },
      {
        q: "Tôi có thể sửa chữ có sẵn trong file PDF không?",
        a: "Không. Công cụ này không sửa chữ có sẵn. Nó thêm nội dung mới đè lên trang. Để thay một từ hay một con số, hãy vẽ ô che trắng đè lên rồi thêm hộp văn bản bên trên. Chữ cũ bị che trên màn hình và khi in, nhưng vẫn còn trong file, nên chương trình sao chép chữ từ PDF vẫn tìm thấy.",
      },
      {
        q: "Làm sao để ký file PDF?",
        a: "Chọn công cụ Vẽ và vẽ chữ ký lên trang bằng chuột, bút cảm ứng hoặc ngón tay. Hoặc chọn Ảnh và tải lên ảnh chữ ký của bạn dạng PNG hoặc JPG. Kéo chữ ký đến đúng chỗ, chỉnh kích thước và nhấp Lưu PDF. Trang Ký PDF mở sẵn với công cụ Vẽ.",
      },
      {
        q: "File PDF của tôi có bị tải lên máy chủ không?",
        a: "Không. File được JavaScript mở ngay trên thiết bị của bạn. Các chỉnh sửa được ghi vào file bằng thư viện mã nguồn mở pdf-lib trong trình duyệt. Không có gì được gửi đến chúng tôi. Bạn có thể ngắt kết nối internet sau khi trang tải xong, công cụ vẫn chạy bình thường.",
      },
      {
        q: "Tôi dùng được phông chữ nào?",
        a: "Helvetica, Times và Courier. Đây là các phông chữ chuẩn của PDF, nên file vẫn nhỏ và mọi trình xem PDF hiển thị được mà không cần nhúng phông. Bạn có thể đặt cỡ chữ và màu cho từng hộp văn bản.",
      },
      {
        q: "Vì sao chữ tiếng Việt có dấu hiện thành dấu hỏi?",
        a: "Các phông chữ chuẩn của PDF chỉ có ký tự Latinh của các ngôn ngữ Tây Âu (bộ WinAnsi). Nhiều chữ tiếng Việt như ă, ơ, ư, đ và chữ có dấu thanh không nằm trong bộ này, nên công cụ ghi dấu hỏi thay vào đó. Hãy gõ chữ không dấu, hoặc thêm chữ có dấu dưới dạng ảnh.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["sign-pdf", "organize-pdf", "pdf-viewer"],
    keywords: [
      "chỉnh sửa pdf",
      "chinh sua pdf",
      "sửa file pdf",
      "chỉnh sửa file pdf online",
      "sửa pdf miễn phí",
      "phần mềm chỉnh sửa pdf",
      "thêm chữ vào pdf",
      "cách chỉnh sửa file pdf",
    ],
  },
  {
    id: "sign-pdf",
    slug: "ky-pdf",
    kind: "edit",
    nav: false,
    priority: 17,
    name: "Ký PDF",
    navLabel: "Ký",
    title: "Ký PDF online – Vẽ hoặc chèn ảnh chữ ký, miễn phí, không tải lên",
    description:
      "Ký file PDF ngay trong trình duyệt. Vẽ chữ ký bằng chuột hoặc ngón tay, hoặc chèn ảnh chữ ký, đặt đúng chỗ và lưu. Miễn phí, không tải lên, không tài khoản.",
    h1: "Ký file PDF",
    intro:
      "Vẽ chữ ký lên trang, hoặc chèn ảnh chữ ký của bạn. Kéo đến đúng chỗ, chỉnh kích thước và lưu file. File PDF không rời khỏi thiết bị của bạn.",
    actionLabel: "Lưu PDF",
    steps: [
      "Kéo thả file PDF vào ô, hoặc nhấp để chọn. Chọn trang cần ký trong dải bên trái.",
      "Công cụ Vẽ đã được chọn sẵn. Vẽ chữ ký lên trang bằng chuột, bút cảm ứng hoặc ngón tay. Hoặc nhấp Ảnh và chèn ảnh PNG hoặc JPG chữ ký của bạn. Kéo vào đúng chỗ và kéo góc để đổi kích thước. Dùng công cụ Văn bản để thêm ngày hoặc tên bạn.",
      "Nhấp Lưu PDF. File đã ký được tải xuống ngay.",
    ],
    faq: [
      {
        q: "Làm sao để ký file PDF mà không cần in ra?",
        a: "Thêm file PDF và vẽ chữ ký lên trang bằng công cụ Vẽ. Bạn có thể dùng chuột, bút cảm ứng hoặc ngón tay trên màn hình cảm ứng. Di chuyển và chỉnh kích thước chữ ký, rồi nhấp Lưu PDF. Chữ ký trở thành một phần của trang. Không cần máy in hay máy scan.",
      },
      {
        q: "Tôi có thể dùng ảnh chữ ký của mình không?",
        a: "Có. Ký lên một tờ giấy trắng, chụp ảnh hoặc scan, rồi lưu dạng PNG hoặc JPG. Nhấp Ảnh, chọn file và đặt lên trang. Ảnh PNG có nền trong suốt trông đẹp nhất. Ảnh được nhúng vào PDF với chất lượng đầy đủ.",
      },
      {
        q: "Đây có phải chữ ký điện tử có giá trị pháp lý không?",
        a: "Công cụ vẽ hình chữ ký của bạn vào trang. Nó không thêm chứng thư số và không xác minh ai đã ký. Nhiều thỏa thuận chấp nhận chữ ký vẽ tay, nhưng quy định khác nhau tùy quốc gia và hợp đồng. Nếu bên kia yêu cầu chữ ký số có chứng thư, hãy dùng dịch vụ cấp chứng thư số.",
      },
      {
        q: "Tôi có thể ký trên điện thoại không?",
        a: "Có. Trang chạy trong trình duyệt của điện thoại hoặc máy tính bảng. Vẽ bằng ngón tay hoặc bút cảm ứng. Chụm hai ngón để phóng to trình duyệt nếu ô ký nhỏ. File ở nguyên trên điện thoại.",
      },
      {
        q: "Tôi có thể thêm ngày cạnh chữ ký không?",
        a: "Có. Chọn công cụ Văn bản, nhấp vào trang và gõ ngày. Bạn có thể đặt cỡ chữ và màu. Kéo hộp văn bản đến cạnh chữ ký.",
      },
      {
        q: "Tài liệu đã ký của tôi có bị tải lên không?",
        a: "Không. File PDF và chữ ký ở nguyên trong trình duyệt của bạn. Chữ ký được JavaScript vẽ vào file ngay trên thiết bị của bạn. Không có gì được gửi đến chúng tôi.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["edit-pdf", "protect-pdf", "merge-pdf"],
    keywords: [
      "ký pdf",
      "ky pdf",
      "chữ ký pdf",
      "ký file pdf online",
      "chèn chữ ký vào pdf",
      "ký tên trên file pdf",
      "tạo chữ ký trên pdf",
      "ký pdf miễn phí",
    ],
    defaults: { tool: "draw" },
  },
];
