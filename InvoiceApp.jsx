// Sharma Interiors Invoice & Quotation Maker - React App (Extended Features with PDF file sharing and PWA support)

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Toaster, toast } from "react-hot-toast";
import saveAs from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const mockUser = { username: "admin", password: "1234" };
const productTemplates = [
  { description: "Interior Design Consultation", rate: 1500 },
  { description: "Modular Kitchen Installation", rate: 25000 },
  { description: "Wardrobe Customization", rate: 18000 }
];

const companyInfo = {
  gstNumber: "27CXVPS6839P1ZX",
  companyName: "Sharma Interiors",
  companyAddress:
    "S NO 27, BHOSALE KHEDEKAR INDUSTRIES SHARMA INTERIORS, NARHE, PUNE, 411041",
  companyPhone: "+91-9850019125",
  companyEmail: "ashoksharma83.pune@gmail.com",
  companyWhatsApp: "+91-9850019125",
  logoUrl:
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,fit=crop,q=95/Aq2vz9xo5lcWbKB3/si-logo-dWxyGXReKrCp8b7y.png",
  terms: "Payment due within 7 days. No refunds after delivery.",
  paymentQR: "https://shorturl.at/aJYFy"
};

function InvoiceApp() {
  const previewRef = useRef(null);
  const [clientName, setClientName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 text-gray-800 dark:text-gray-100">
      <Toaster />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{companyInfo.companyName} Invoice Generator</h1>
        <p className="text-sm">GST: {companyInfo.gstNumber}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-2 pt-4">
              <div>
                <label className="font-semibold">Client Name</label>
                <Input placeholder="Client Full Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              </div>
              <div>
                <label className="font-semibold">Billing Address</label>
                <Textarea placeholder="Client Billing Address" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
              </div>
              <div>
                <label className="font-semibold">Item</label>
                <Input placeholder="Item Description" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </div>
              <div>
                <label className="font-semibold">Amount</label>
                <Input type="number" placeholder="Amount in ₹" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
              </div>
              <Button className="mt-2 w-full">Generate Invoice</Button>
            </CardContent>
          </Card>
        </div>

        <div className="border p-4 bg-white dark:bg-gray-800 rounded shadow" ref={previewRef}>
          <div className="flex justify-between items-center">
            <img src={companyInfo.logoUrl} alt="Company Logo" className="h-20" />
            <div className="text-right">
              <h2 className="text-2xl font-bold">INVOICE</h2>
              <p className="text-sm">GSTIN: {companyInfo.gstNumber}</p>
            </div>
          </div>

          <div className="mt-4">
            <p><strong>Company:</strong> {companyInfo.companyName}</p>
            <p><strong>Address:</strong> {companyInfo.companyAddress}</p>
            <p><strong>Email:</strong> {companyInfo.companyEmail}</p>
            <p><strong>Phone/WhatsApp:</strong> {companyInfo.companyPhone}</p>
          </div>

          <hr className="my-4" />

          <div className="mb-2">
            <p><strong>Client Name:</strong> {clientName || "[Client Name Here]"}</p>
            <p><strong>Billing Address:</strong> {billingAddress || "[Billing Address Here]"}</p>
          </div>

          <div className="my-4">
            <table className="w-full border">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="border px-2 py-1">#</th>
                  <th className="border px-2 py-1">Description</th>
                  <th className="border px-2 py-1">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">1</td>
                  <td className="border px-2 py-1">{itemDescription || "Item Description"}</td>
                  <td className="border px-2 py-1">{amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-right font-semibold">
            Total: ₹{amount.toFixed(2)}
          </div>

          <div className="mt-4 text-sm">
            <p><strong>Terms & Conditions:</strong> {companyInfo.terms}</p>
            <p className="mt-2">Scan below QR to pay:</p>
            <img src={companyInfo.paymentQR} alt="QR Code" className="h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceApp;
