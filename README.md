# 🎀 BOWIE — Little Bows, Big Love

Website thương mại điện tử chuyên bán nơ và phụ kiện tóc dành cho nữ, lấy cảm hứng từ các cửa hàng phụ kiện Hàn Quốc, phong cách Balletcore & Coquette ngọt ngào và Pinterest.

![BOWIE Cover Banner](https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80)

---

## 🌸 1. Ý Tưởng & Phong Cách Thiết Kế

- **Slogan:** *“A Little Bow, A Lot of Love — Một chiếc nơ nhỏ, ngàn điều đáng yêu.”*
- **Đối tượng:** Học sinh, sinh viên và phái đẹp yêu thích phong cách nữ tính, ngọt ngào, tinh tế (Korean Aesthetic, Coquette, Balletcore).
- **Giao diện:** Bố cục thoáng, typography kết hợp giữa Sans-serif hiện đại (*Plus Jakarta Sans*) và Serif thanh lịch (*Playfair Display*), điểm xuyết nét viết tay (*Caveat*).
- **Trải nghiệm mượt mà:** Hiệu ứng hover mềm, slide drawer giỏ hàng, thông báo Toast xinh xắn, tìm kiếm thông minh và tiến độ Freeship trực quan.

---

## 🎨 2. Bảng Màu Pastel Chủ Đạo

Hệ thống màu sắc được quản lý 100% bằng CSS Variables tại `src/styles/global.css`:

| Tên màu | Mã Hex | Vai trò |
| :--- | :--- | :--- |
| **Hồng pastel** | `#F7C8D8` | Màu thương hiệu, nền nhẹ, viền trang trí |
| **Hồng đậm** | `#E98BAA` | Nút nhấn phụ, tag nổi bật |
| **Hồng phấn nhạt** | `#FFF0F5` | Nền các khối nội dung, card, banner |
| **Trắng kem** | `#FFFCF8` | Nền chính của toàn website |
| **Đỏ cherry** | `#C84B68` | Điểm nhấn chính: Logo, nút Mua hàng, giá khuyến mãi |
| **Nâu chữ** | `#55434A` | Màu chữ đọc chính, dịu mắt hơn màu đen tuyền |
| **Trắng tinh khôi** | `#FFFFFF` | Nền card sản phẩm, header nổi |

---

## ⚡ 3. Công Nghệ Sử Dụng

- **React 18** kết hợp **Vite** siêu nhanh.
- **JavaScript & JSX**.
- **CSS3 thuần** (CSS Variables, Flexbox, Grid, Keyframe Animations, Backdrop Filter).
- **React Router DOM v6** cho điều hướng đa trang mượt mà (SPA).
- **Lucide React** cho bộ icon sắc nét, hiện đại.
- **React Context API**: Quản lý Giỏ hàng (`CartContext`), Danh sách yêu thích (`WishlistContext`), và Thông báo (`ToastContext`).
- **LocalStorage**: Lưu trữ giỏ hàng và danh sách yêu thích bền bỉ qua các phiên tải lại trang.
- **100% Responsive**: Tối ưu hoàn hảo cho Mobile (chuẩn trải nghiệm 1 tay), Tablet và Desktop.

---

## 🛍️ 4. Các Chức Năng Chính Hoạt Động Thực Tế

### 🏠 Trang Chủ (`/`)
1. **Announcement Bar:** Thông báo Freeship từ 199K kèm hiệu ứng đóng mở linh hoạt.
2. **Sticky Header:** Thanh điều hướng mờ kính (glassmorphism) tinh tế, huy hiệu giỏ hàng & yêu thích nhảy số tự động.
3. **Hero Section:** Bố cục editorial thời trang 2 cột, huy hiệu nơ bồng bềnh và nút khám phá.
4. **4 Danh Mục Nổi Bật:**
   - *Satin Bows* — Nơ lụa sang trọng.
   - *Mini Bows* — Nơ nhỏ xinh Balletcore.
   - *Ribbon Clips* — Kẹp tóc ruy băng thướt tha.
   - *Gift Sets* — Hộp quà tặng 3 lớp kèm thiệp viết tay.
5. **Top 8 Sản Phẩm Bán Chạy:** Đầy đủ ảnh, giá VNĐ, giá gốc gạch ngang, % giảm giá, đánh giá sao, nút yêu thích và thêm nhanh vào giỏ.
6. **"Find Your Bow Era":** 3 phong cách thời trang ấn tượng:
   - *Pink Princess* (Ngọt ngào, kẹo ngọt).
   - *Soft Girl* (Trong trẻo, nhã nhặn).
   - *Cherry Coquette* (Quyến rũ, nổi bật với nhung đỏ cherry).
7. **Promo Banner:** Tặng mã ưu đãi giảm 10% `BOWIE10` cho đơn hàng đầu tiên.
8. **Feedback Khách Hàng:** 4 đánh giá chân thực từ khách hàng kèm ghi chú minh bạch dữ liệu mẫu.
9. **Newsletter:** Đăng ký nhận tin với kiểm tra định dạng email regex và trạng thái thành công.
10. **Footer:** Đầy đủ thông tin cửa hàng, chính sách đổi trả 7 ngày, hướng dẫn bảo quản và mạng xã hội.

### 🛒 Trang Cửa Hàng (`/shop`)
- Bộ lọc danh mục (Tất cả, Nơ lụa, Nơ mini, Kẹp ruy băng, Hộp quà tặng, Băng đô, Scrunchies).
- Lọc theo khoảng giá (Dưới 50K, 50K-100K, Trên 100K).
- Lọc theo màu sắc thực tế (Hồng pastel, Đỏ cherry, Trắng kem, Đen tuyền, Vàng bơ, Xanh baby).
- Lọc theo Bow Era phong cách.
- Tìm kiếm theo từ khóa tức thì.
- Sắp xếp: Mới nhất, Bán chạy nhất, Giá tăng dần, Giá giảm dần, Đánh giá cao nhất.
- Hàng thẻ chip bộ lọc đang áp dụng kèm nút "Xóa tất cả bộ lọc".
- Phân trang & nút "Tải thêm sản phẩm".

### 🎀 Trang Chi Tiết Sản Phẩm (`/product/:id`)
- Gallery nhiều góc ảnh độ phân giải cao kèm thumbnail chọn ảnh.
- Chọn bảng màu sắc nơ trực quan.
- Tăng giảm số lượng sản phẩm.
- Accordion 3 tab: Thông số & chất liệu, Hướng dẫn bảo quản nơ lụa, Đóng gói hộp quà 3 lớp & vận chuyển.
- Nút "Thêm vào giỏ" và "Mua ngay" (chuyển thẳng đến trang thanh toán).
- Gợi ý sản phẩm tương tự cùng danh mục.

### 🛍️ Giỏ Hàng & Mini-Cart Drawer (`/cart` & `CartDrawer`)
- Thêm, sửa số lượng, xóa sản phẩm nhanh chóng.
- Tự động tính thành tiền từng món và tổng đơn hàng.
- **Thanh đo tiến độ Miễn phí vận chuyển (Threshold 199.000₫)** với % và số tiền cần mua thêm.
- Áp dụng các mã ưu đãi demo:
  - `BOWIE10`: Giảm 10% đơn hàng.
  - `BOWIELOVE`: Giảm 20.000₫ cho đơn từ 99K.
  - `FREESHIP`: Miễn phí vận chuyển.
  - `CHERRY15`: Giảm 15% cho đơn từ 150K.
- Lựa chọn đóng gói hộp quà tặng miễn phí kèm ô nhập nội dung thiệp viết tay gửi tặng người thương.

### 💳 Trang Thanh Toán (`/checkout`) & Xác Nhận Đơn Hàng (`/order-success`)
- Điền họ tên, số điện thoại, email, địa chỉ giao hàng, tỉnh/thành phố, ghi chú.
- Kiểm tra hợp lệ dữ liệu form trước khi gửi.
- 3 phương thức thanh toán mô phỏng:
  - **COD** (Thanh toán tiền mặt khi nhận hàng).
  - **Chuyển khoản VietQR** (Có bảng mô phỏng mã QR ngân hàng MB Bank).
  - **Ví MoMo / ZaloPay**.
- Trang xác nhận đơn hàng hiển thị mã đơn hàng dạng `#BW-XXXXXX`, ngày giờ đặt, địa chỉ, phương thức thanh toán, nút in biên nhận và disclaimer mô phỏng an toàn.

---

## 📁 5. Cấu Trúc Thư Mục Dự Án

```
duan1/
├── index.html                  # HTML entry point kèm Google Fonts
├── package.json                # Cấu hình dependency & script
├── vite.config.js              # Cấu hình Vite React server
├── README.md                   # Hướng dẫn chi tiết
│
└── src/
    ├── main.jsx                # Render React root & Providers
    ├── App.jsx                 # Bộ định tuyến Router & Layout
    │
    ├── styles/
    │   ├── global.css          # CSS Variables, reset, typography, buttons
    │   └── components.css      # CSS cho Header, Hero, Cards, Cart, Drawer
    │
    ├── data/
    │   ├── categories.js       # Danh mục nơ & Bow Eras
    │   ├── products.js         # 14 mẫu nơ với đầy đủ chi tiết, màu, ảnh
    │   ├── reviews.js          # Đánh giá khách hàng mẫu
    │   └── coupons.js          # Danh sách mã giảm giá demo
    │
    ├── context/
    │   ├── CartContext.jsx     # Logic giỏ hàng, tính tiền, freeship, coupon
    │   ├── WishlistContext.jsx # Logic danh sách yêu thích
    │   └── ToastContext.jsx    # Hệ thống thông báo toast xinh xắn
    │
    ├── components/
    │   ├── AnnouncementBar.jsx # Thanh thông báo trên cùng
    │   ├── Header.jsx          # Thanh điều hướng sticky + menu mobile
    │   ├── Footer.jsx          # Chân trang thông tin & chính sách
    │   ├── ProductCard.jsx     # Card sản phẩm tương tác
    │   ├── ProductGrid.jsx     # Lưới hiển thị danh sách nơ
    │   ├── CategoryCard.jsx    # Card danh mục ảnh
    │   ├── CartDrawer.jsx      # Slide-over giỏ hàng bên phải
    │   ├── SearchModal.jsx     # Modal tìm kiếm nhanh bằng từ khóa
    │   ├── ScrollToTop.jsx     # Nút quay về đầu trang
    │   ├── Newsletter.jsx      # Đăng ký nhận email ưu đãi
    │   └── Toast.jsx           # Khung thông báo góc màn hình
    │
    └── pages/
        ├── Home.jsx            # Trang chủ phong cách editorial
        ├── Shop.jsx            # Cửa hàng kèm bộ lọc đa năng
        ├── ProductDetail.jsx   # Chi tiết sản phẩm, gallery, chất liệu
        ├── Cart.jsx            # Trang giỏ hàng đầy đủ
        ├── Checkout.jsx        # Thanh toán đơn hàng demo
        ├── OrderSuccess.jsx    # Xác nhận đơn hàng thành công
        ├── Collections.jsx     # Lookbook các bộ sưu tập
        ├── About.jsx           # Câu chuyện thương hiệu & hướng dẫn chọn size
        ├── Wishlist.jsx        # Danh sách sản phẩm yêu thích
        └── NotFound.jsx        # Trang 404 dễ thương
```

---

## 💻 6. Hướng Dẫn Chạy Dự Án Trên Windows (VS Code)

### Bước 1: Mở thư mục dự án trong VS Code
Mở VS Code, chọn **File > Open Folder...** và chọn thư mục `d:\VSCODE\PROJECT\duan1`.

### Bước 2: Mở Terminal trong VS Code
Nhấn tổ hợp phím **`` Ctrl + ` ``** (hoặc chọn menu **Terminal > New Terminal**).

### Bước 3: Chạy ứng dụng
Trong cửa sổ PowerShell của VS Code, chạy lệnh:

```powershell
npm run dev
```

> **Ghi chú nếu máy bạn sử dụng Node.js tùy biến:**
> Nếu lệnh `npm` chưa nằm trong biến môi trường PATH mặc định, bạn chỉ cần chạy lệnh sau một lần trong Terminal:
> ```powershell
> $env:PATH = "D:\nodejs\node-v20.18.0-win-x64;" + $env:PATH
> npm run dev
> ```

Sau khi chạy lệnh, Terminal sẽ hiển thị đường link:
```
  VITE v5.4.11  ready in 320 ms

  ➜  Local:   http://localhost:3000/
```

Nhấn giữ phím **Ctrl** và nhấp chuột vào liên kết `http://localhost:3000/` (hoặc mở trình duyệt và gõ địa chỉ đó) để chiêm ngưỡng website BOWIE!

### Bước 4: Đóng gói sản phẩm (Build Production)
Khi muốn xuất bản sản phẩm ra thư mục `dist`:
```powershell
npm run build
```
Và xem thử bản build:
```powershell
npm run preview
```

---

*BOWIE — Little Bows, Big Love 🎀✨*

