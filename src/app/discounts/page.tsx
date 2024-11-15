import { VoucherList } from './components/voucher-list';
import { PromoList } from './components/promo-list';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container py-8 space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Special Offers</h1>
          <p className="text-muted-foreground text-lg">
            Discover exclusive vouchers and promotional offers for your next purchase
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Available Vouchers</h2>
          <VoucherList />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Current Promotions</h2>
          <PromoList />
        </section>
      </div>
    </main>
  );
}