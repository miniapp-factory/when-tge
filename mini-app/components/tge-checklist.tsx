"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const criteria = [
  "Market Conditions",
  "Sentiment Analysis",
  "Liquidity",
  "Community Engagement",
  "Regulatory Compliance",
  "Technical Readiness",
  "Marketing Plan",
  "Team Experience",
  "Tokenomics",
  "Roadmap",
];

export default function TgeChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(criteria.map((c) => [c, false]))
  );

  const toggle = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const total = criteria.length;
  const score = Math.round((checkedCount / total) * 100);

  return (
    <Card className="w-full max-w-2xl mt-6">
      <CardHeader>
        <CardTitle>TGE Readiness Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {criteria.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={checked[item]}
                onCheckedChange={() => toggle(item)}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium">Readiness Score:</span>
          <span className={cn("font-semibold", score >= 80 ? "text-green-600" : "text-red-600")}>
            {score}%
          </span>
        </div>
        {score >= 80 && (
          <p className="mt-2 text-green-600 font-medium">
            Great! Your project is ready for a successful TGE.
          </p>
        )}
        {score < 80 && (
          <p className="mt-2 text-red-600 font-medium">
            Consider addressing the highlighted areas before launching.
          </p>
        )}
        <Button className="mt-4" onClick={() => window.scrollTo(0, 0)}>
          Reset Checklist
        </Button>
      </CardContent>
    </Card>
  );
}
