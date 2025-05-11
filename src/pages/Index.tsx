
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <CategorySection />
        
        {/* Newsletter Section */}
        <section className="py-12 md:py-16 container">
          <div className="bg-accent rounded-lg p-6 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-6 md:w-2/3 mx-auto">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md border flex-grow"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
