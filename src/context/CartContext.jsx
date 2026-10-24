import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';
import { validCoupons } from '../data/coupons';

const CartContext = createContext();

const STORAGE_KEY = 'bowie_cart_v1';
const FREE_SHIP_THRESHOLD = 199000;
const STANDARD_SHIPPING = 25000;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from LocalStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(true);
  const [orderNotes, setOrderNotes] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to LocalStorage', e);
    }
  }, [cart]);

  const addToCart = (product, selectedColor = null, quantity = 1, openDrawer = true) => {
    const colorToUse = selectedColor || product.colors?.[0]?.name || 'Mặc định';
    const itemId = `${product.id}-${colorToUse}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            product,
            selectedColor: colorToUse,
            quantity
          }
        ];
      }
    });

    showToast(`Đã thêm "${product.name}" (${colorToUse}) vào giỏ hàng 🎀`, 'success');

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (cartItemId) => {
    const itemToRemove = cart.find((i) => i.id === cartItemId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    if (itemToRemove) {
      showToast(`Đã xóa "${itemToRemove.product.name}" khỏi giỏ hàng`, 'info');
    }
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setOrderNotes('');
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const freeShipRemaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const freeShipProgress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));
  const isFreeShip = subtotal >= FREE_SHIP_THRESHOLD || appliedCoupon?.type === 'shipping';

  const rawShipping = cart.length === 0 ? 0 : STANDARD_SHIPPING;
  const shippingFee = isFreeShip ? 0 : rawShipping;

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === 'percent') {
      return Math.round(subtotal * (appliedCoupon.value / 100));
    }

    if (appliedCoupon.type === 'fixed') {
      return Math.min(subtotal, appliedCoupon.value);
    }

    if (appliedCoupon.type === 'shipping') {
      return isFreeShip ? 0 : STANDARD_SHIPPING;
    }

    return 0;
  }, [appliedCoupon, subtotal, isFreeShip]);

  const grandTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    const total = subtotal + shippingFee - (appliedCoupon?.type === 'shipping' ? 0 : discountAmount);
    return Math.max(0, total);
  }, [cart.length, subtotal, shippingFee, appliedCoupon, discountAmount]);

  const applyCoupon = (code) => {
    setCouponError('');
    const cleanCode = code.trim().toUpperCase();

    const coupon = validCoupons.find((c) => c.code === cleanCode);

    if (!coupon) {
      setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
      showToast('Mã giảm giá không hợp lệ!', 'error');
      return false;
    }

    if (subtotal < coupon.minOrder) {
      const errMsg = `Mã ${coupon.code} chỉ áp dụng cho đơn từ ${coupon.minOrder.toLocaleString('vi-VN')}₫.`;
      setCouponError(errMsg);
      showToast(errMsg, 'error');
      return false;
    }

    setAppliedCoupon(coupon);
    showToast(`Áp dụng thành công mã "${coupon.code}" 🎉`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    showToast('Đã hủy mã giảm giá', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subtotal,
        shippingFee,
        discountAmount,
        grandTotal,
        freeShipThreshold: FREE_SHIP_THRESHOLD,
        freeShipRemaining,
        freeShipProgress,
        isFreeShip,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponError,
        isGiftWrap,
        setIsGiftWrap,
        orderNotes,
        setOrderNotes
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

