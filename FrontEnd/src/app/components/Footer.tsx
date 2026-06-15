import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#003B7A] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#003B7A] font-bold">FIFA</span>
              </div>
              <div>
                <div className="font-semibold">FIFA World Cup</div>
                <div className="text-sm text-white/70">2026</div>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              México • Canadá • Estados Unidos
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Grupos</li>
              <li className="hover:text-white cursor-pointer">Selecciones</li>
              <li className="hover:text-white cursor-pointer">Fixture</li>
              <li className="hover:text-white cursor-pointer">Estadios</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Redes Sociales</h3>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={20} />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={20} />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Youtube size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/70">
          <p>© 2026 FIFA World Cup. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
