export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-restaurant-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Savory</h3>
            <p className="text-gray-300 mb-6 max-w-xs">
              Изысканная кухня в лучших традициях. Насладитесь кулинарным совершенством в элегантной и гостеприимной атмосфере.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Часы работы</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex justify-between">
                <span>Понедельник - Четверг</span>
                <span>17:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Пятница - Суббота</span>
                <span>17:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Воскресенье</span>
                <span>17:00 - 21:00</span>
              </li>
              <li className="flex justify-between text-restaurant-red">
                <span>Счастливые часы</span>
                <span>17:00 - 18:30</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-gray-300">
              <li>ул. Гурмэ, 123</li>
              <li>Кулинарный Город, КГ 12345</li>
              <li>Телефон: (123) 456-7890</li>
              <li>Email: info@savoryrestaurant.com</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Ресторан Savory. Все права защищены.
          </p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            <a href="#" className="hover:text-white transition-colors">Доступность</a>
          </div>
        </div>
      </div>
    </footer>
  );
};