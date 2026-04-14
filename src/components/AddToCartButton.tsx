"use client";

import useCartStore from '@/store/cartStore';

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl || undefined
    });
    alert('Product added to cart!');
  };

  return (
    <button onClick={handleAdd} className="btn-secondary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem' }}>
      Add to Cart
    </button>
  );
}
