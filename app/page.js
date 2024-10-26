"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { X, Plus, Code } from 'lucide-react';
import axios from 'axios';

const RuleEngine = () => {
  const [rule, setRule]=useState("");
  const [userData, setUserData] = useState("");
  const [result, setResult] = useState(false);
  const cominators= ["AND", "OR"];
  const evaluateRules = async ()=>{
    const ast = (await axios.post('api/rules', {rule: rule})).data;
    const res=(await axios.put('api/rules',{ast: ast, data: userData})).data
    if(res.result){
      alert("Congrats You've passed the test");
    }
    else{
      alert("Oop's You've failed the test");
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
                onChange={(e) => setRule( e.target.value)}
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
          <Button onClick={evaluateRules} disabled={ !rule || !userData}>
            {/* {loading ? 'Evaluating...' : 'Evaluate All Rules'} */}
            Evaluate Rule
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evaluation Results</CardTitle>
        </CardHeader>
        
      </Card>
    </div>
  );
};

export default RuleEngine;