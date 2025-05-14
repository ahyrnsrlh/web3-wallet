"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function FallbackSpline() {
  return (
    <Card className="w-full h-[300px] overflow-hidden">
      <CardContent className="p-0 h-full flex items-center justify-center bg-primary/5">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Web3 Wallet</h3>
          <p className="text-muted-foreground">
            Manage your digital assets securely with our Web3 wallet solution
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
