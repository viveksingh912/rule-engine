"use client"
import { connectToDatabase } from "@/lib/db";
import Image from "next/image";
import { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";

export default function Home() {
  useEffect(()=>{

  const makeReques= async ()=>{
    const  ruleString  ="((age > 30 AND department ='Sales') OR (age < 25 AND'Marketing')) AND (salary > 50000 OR experience >5)"
    const url = queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/rules`,
      query: { ruleString },
    });

    const response = await axios.post(url, {}); 
}
makeReques();
},[]);
  return (
  <>
  <div>
    
  </div>
  </>
  );
}
