import Link from 'next/link';
import { MassageService } from '@/data/services';

interface ServiceCardProps {
  service: MassageService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const minPrice = Math.min(...service.durations.map((d) => d.price));

  return (
    <div className="service-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {service.tags?.includes('beliebt') && (
          <span className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
            Beliebt
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <span className="text-2xl">{service.icon}</span>
        <h3 className="text-lg font-serif font-bold text-gray-900">
          {service.name}
        </h3>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {service.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-massage-700 font-semibold">
          ab &euro;{minPrice}
        </span>
        <Link
          href={`/massagetechniken#${service.id}`}
          className="text-sm font-medium text-massage-600 hover:text-massage-800 transition-colors"
        >
          Mehr erfahren &rarr;
        </Link>
      </div>
    </div>
  );
}
