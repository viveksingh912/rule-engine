"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { X, Plus, Code } from "lucide-react";
import axios from "axios";

const RuleEngine = () => {
  const [rule, setRule] = useState("");
  const [userData, setUserData] = useState("");
  const [result, setResult] = useState(null);
  const cominators = ["AND", "OR"];
  const evaluateRules = async () => {
    const data = await axios.post("api/rules", { rule: rule });
    let ast;
    if (data.status !== 200) {
      alert(data.error);
      return;
    }
    else{
      ast=data.data;
    }
    const res = await axios.put("api/rules", { ast: ast, data: userData });
    if (res.status == 200) {
      setResult(res.data.result);
      setTimeout(() => {
        setResult(null)
      }, 5000);
    } else {
      alert(res.error);
    }
  };
  
   
  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rule Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter rule string"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            rows={5}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter test data in JSON format"
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            rows={5}
          />
          <Button onClick={evaluateRules} disabled={!rule || !userData}>
            {/* {loading ? 'Evaluating...' : 'Evaluate All Rules'} */}
            Evaluate Rule
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evaluation Results</CardTitle>
          {result==true && <div> You've passed this test</div>}
          {result==false && <div> You've failed this test</div>}
        </CardHeader>
      </Card>
    </div>
  );
};

export default RuleEngine;
