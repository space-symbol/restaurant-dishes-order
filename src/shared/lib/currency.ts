type CurrencyOptions = {
  locale?: string;
  currency?: string;
};

const defaultOptions: CurrencyOptions = {
  locale: 'ru-RU',
  currency: 'RUB'
};

export const formatCurrency = (
  amount: number,
  options: CurrencyOptions = defaultOptions
): string => {
  const { locale, currency } = { ...defaultOptions, ...options };
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}; 