
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-gradient py-16 md:py-24 text-white">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Shop Smart, <br />
            Live Better
          </h1>
          <p className="text-lg opacity-90">
            Discover premium products at unbeatable prices. From electronics to fashion, we've got everything you need.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-secondary hover:bg-gray-100">
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl rotate-3 hover-scale">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Shopping Experience"
              className="w-full h-auto rounded-lg shadow-lg"
              width={500}
              height={375}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
