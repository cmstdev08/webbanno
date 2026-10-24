import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

const STORAGE_KEY = 'bowie_wishlist_v1';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['bw-01', 'bw-03'];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
      return ['bw-01', 'bw-03'];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const toggleWishlist = (productId, productName = 'sản phẩm') => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Đã bỏ ${productName} khỏi danh sách yêu thích 💔`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Đã thêm ${productName} vào danh sách yêu thích 💖`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

