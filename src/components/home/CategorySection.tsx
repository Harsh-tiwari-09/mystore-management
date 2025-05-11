
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { Card, CardContent } from '@/components/ui/card';

const CategorySection = () => {
  return (
    <section className="py-12 bg-accent">
      <div className="container">
        <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
        <p className="text-muted-foreground mb-8">Browse our wide range of products by category</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/products?category=${category.name.toLowerCase()}`} key={category.id} className="group">
              <Card className="overflow-hidden hover-scale">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <CardContent className="p-4 text-white">
                      <h3 className="font-semibold text-xl">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
