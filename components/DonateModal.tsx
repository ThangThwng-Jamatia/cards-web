'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface DonateModalProps {
  children?: React.ReactNode;
}

export default function DonateModal({ children }: DonateModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const predefinedAmounts = [100, 500, 1000, 2000, 5000];

  const handleDonate = async () => {
    const donationAmount = parseFloat(amount);

    if (!amount || donationAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);

    try {
      // Create order on backend
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: data.key_id,
          amount: data.amount,
          currency: data.currency,
          name: 'Minor Devs Studios',
          description: 'Support our work',
          order_id: data.id,
          handler: function (response: any) {
            toast.success('Thank you for your generous donation!');
            setIsOpen(false);
            setAmount('');
            setIsLoading(false);
          },
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          theme: {
            color: '#ffffff',
            backdrop_color: 'rgba(0, 0, 0, 0.8)',
          },
          modal: {
            ondismiss: function () {
              setIsLoading(false);
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        toast.error('Failed to load payment gateway');
        setIsLoading(false);
      };
    } catch (error) {
      console.error('Donation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process donation');
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <motion.button
            whileHover={{ x: 4 }}
            className="text-neutral-400 text-sm font-light hover:text-white transition-colors flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Donate
          </motion.button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/95 backdrop-blur-xl border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Support Minor Devs Studios
          </DialogTitle>
          <DialogDescription className="text-neutral-400 font-light">
            Your donation helps us continue creating inspiring contents and applications for young people.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Predefined amounts */}
          <div>
            <label className="text-sm text-neutral-400 font-light mb-3 block">
              Quick Select
            </label>
            <div className="grid grid-cols-3 gap-2">
              {predefinedAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  variant="outline"
                  onClick={() => setAmount(presetAmount.toString())}
                  className={`
                    border-white/10 bg-white/5 hover:bg-white/10 text-white font-light
                    transition-all duration-200
                    ${amount === presetAmount.toString() ? 'bg-white/20 border-white/30' : ''}
                  `}
                >
                  ₹{presetAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom amount input */}
          <div>
            <label htmlFor="amount" className="text-sm text-neutral-400 font-light mb-2 block">
              Custom Amount (₹)
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-white/20"
              min="1"
              disabled={isLoading}
            />
          </div>

          {/* Test mode notice */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-xs text-blue-400 font-light">
              🧪 Test Mode: This is a demo integration. Use Razorpay test cards for testing.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-light"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDonate}
            disabled={isLoading || !amount}
            className="bg-white text-black hover:bg-neutral-200 font-light transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Donate ₹{amount || '0'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
