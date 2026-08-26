import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  MapPin, 
  Handshake, 
  ArrowRight,
  Building2
} from 'lucide-react';
import { Supporter } from '../types';
import { SUPPORTERS } from '../data/supporters';
import { SporsepetiIcon } from './SporsepetiIcon';

interface SupportersSectionProps {
  onOpenPartnerModal: () => void;
  supportersList?: Supporter[];
}

export const SupportersSection: React.FC<SupportersSectionProps> = ({ onOpenPartnerModal, supportersList }) => {
  const allSupporters = supportersList && supportersList.length > 0 ? supportersList : SUPPORTERS;
  const primarySupporter = allSupporters.find(s => s.id === 'sporsepeti-corp') || allSupporters[0];
  const additionalPartners = allSupporters.filter(s => s.id !== 'sporsepeti-corp');

  return (
    <section id="supporters" className="py-20 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ekosistem Destekleyicileri & Partnerler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            Güçlü Ekosistem Desteğiyle <br />
            <span className="text-emerald-600">
              Türk Sporunun Dijital Geleceğini Şekillendiriyoruz
            </span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Sporsepeti Spor Teknolojileri Ltd. Şti. ve ekosisteme katılan öncü spor kulüpleri, üniversiteler ve yatırım fonlarıyla spor teknolojilerini büyütüyoruz.
          </p>
        </div>

        {/* Primary Anchor Supporter Card (Sporsepeti) */}
        {primarySupporter && (
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="bg-white border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 transition-all flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden shadow-sm hover:shadow-md"
              id={`supporter-card-${primarySupporter.id}`}
            >
              <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 p-3 flex items-center justify-center shrink-0 shadow-2xs">
                {primarySupporter.id === 'sporsepeti-corp' ? (
                  <SporsepetiIcon className="w-16 h-16" />
                ) : (
                  <img 
                    src={primarySupporter.logo} 
                    alt={primarySupporter.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    {primarySupporter.typeName}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {primarySupporter.location}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {primarySupporter.name}
                </h3>

                <div className="text-xs sm:text-sm font-semibold text-emerald-700">
                  {primarySupporter.role}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {primarySupporter.description}
                </p>

                <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
                  <a
                    href={primarySupporter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors border border-emerald-200"
                    id="supporter-website-link"
                  >
                    <span>Web Sitesini Ziyaret Et</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Approved Ecosystem Partners Grid */}
        {additionalPartners.length > 0 && (
          <div className="mb-14">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Doğrulanmış Ekosistem Partnerleri & Kulüpler
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pilot uygulama, AR-GE doğrulaması ve yatırım havuzunda yer alan kurumlar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 text-emerald-700 font-bold text-lg font-mono shrink-0">
                        {partner.logo && partner.logo !== '/logo.svg' ? (
                          <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
                        ) : (
                          <Building2 className="w-6 h-6 text-emerald-600" />
                        )}
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-bold">
                        {partner.typeName}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-display line-clamp-1">
                        {partner.name}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                        {partner.role}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {partner.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{partner.location}</span>
                    </div>
                  </div>

                  {partner.website && (
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                      >
                        <span>Kurum Sayfası</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {partner.stats || 'Onaylı Partner'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Become an Ecosystem Partner Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xs">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Handshake className="w-6 h-6" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Kulübünüz veya Kurumunuz İçin Ekosistem Partneri Olun
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              En son spor teknolojilerini tesislerinizde test etmek, girişimcilere mentörlük sağlamak veya yatırımcı havuzuna dahil olmak için SportTech Türkiye ailesine katılın.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenPartnerModal}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2"
                id="supporters-partner-cta-btn"
              >
                <span>Partnerlik Başvurusu Yap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
