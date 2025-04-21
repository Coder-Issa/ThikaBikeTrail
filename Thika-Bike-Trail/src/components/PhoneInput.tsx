
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

// Some common country codes
const countryCodes = [
  { code: "+254", country: "Kenya" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+255", country: "Tanzania" },
  { code: "+256", country: "Uganda" },
  { code: "+251", country: "Ethiopia" },
  { code: "+27", country: "South Africa" },
];

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [countryCode, setCountryCode] = useState("+254"); // Default to Kenya
  const [phoneNumber, setPhoneNumber] = useState("");

  // Parse initial value if provided
  useEffect(() => {
    if (value) {
      // Try to extract country code and number
      const knownCodes = countryCodes.map(c => c.code);
      const foundCode = knownCodes.find(code => value.startsWith(code));
      
      if (foundCode) {
        setCountryCode(foundCode);
        setPhoneNumber(value.substring(foundCode.length));
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  // Update parent component when either country code or phone number changes
  useEffect(() => {
    const fullNumber = countryCode + phoneNumber;
    onChange(fullNumber);
  }, [countryCode, phoneNumber, onChange]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const cleaned = e.target.value.replace(/\D/g, "");
    setPhoneNumber(cleaned);
  };

  return (
    <div className="flex gap-2">
      <div className="w-28">
        <Select
          value={countryCode}
          onValueChange={(value) => setCountryCode(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Code" />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.code} ({country.country})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Phone number"
          className="w-full"
        />
      </div>
    </div>
  );
};