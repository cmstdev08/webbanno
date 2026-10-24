export const validCoupons = [
  {
    code: 'BOWIE10',
    type: 'percent',
    value: 10,
    minOrder: 0,
    description: 'Giảm 10% cho đơn hàng đầu tiên'
  },
  {
    code: 'BOWIELOVE',
    type: 'fixed',
    value: 20000,
    minOrder: 99000,
    description: 'Giảm 20.000₫ cho đơn từ 99K'
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 25000,
    minOrder: 149000,
    description: 'Miễn phí vận chuyển cho đơn từ 149K'
  },
  {
    code: 'CHERRY15',
    type: 'percent',
    value: 15,
    minOrder: 150000,
    description: 'Giảm 15% cho đơn từ 150K'
  }
];

