import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";

export type AdditionalField = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export type PickupOption = {
  id: string;
  name: string;
  description: string;
  additionalFields: AdditionalField[];
};

interface OrderPickupOptionsProps {
  options: PickupOption[];
  selectedOptionId: string;
  onOptionChange: (optionId: string) => void;
  className?: string;
}

export const OrderPickupOptions = ({
  options,
  selectedOptionId,
  onOptionChange,
  className,
}: OrderPickupOptionsProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Способ получения</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOptionId}
          onValueChange={onOptionChange}
          className="space-y-4"
        >
          {options.map((option) => (
            <div key={option.id}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={option.id} id={option.id} />
                <div className="flex-1">
                  <Label htmlFor={option.id} className="font-medium inline-block w-full py-2">
                    {option.name}
                  </Label>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}; 