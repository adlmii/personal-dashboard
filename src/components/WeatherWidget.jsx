import { Sun, Cloud, Wind, CloudRain, Snowflake, CloudLightning, MapPin } from "lucide-react";

export default function WeatherWidget({ weather }) {
  const getWeatherInfo = (code) => {
    // Kita gunakan palette yang konsisten (Indigo/Slate) untuk background
    // Tapi ikonnya tetap berwarna agar informatif
    if (code === 0) return { icon: <Sun className="w-10 h-10 text-amber-400" />, label: "Cerah", desc: "Langit Bersih" };
    if (code >= 1 && code <= 3) return { icon: <Cloud className="w-10 h-10 text-slate-300" />, label: "Berawan", desc: "Sejuk" };
    if (code >= 51 && code <= 67) return { icon: <CloudRain className="w-10 h-10 text-blue-300" />, label: "Hujan", desc: "Sedia Payung" };
    if (code >= 95) return { icon: <CloudLightning className="w-10 h-10 text-yellow-400" />, label: "Badai", desc: "Waspada" };
    return { icon: <Wind className="w-10 h-10 text-slate-400" />, label: "Mendung", desc: "Berangin" };
  };

  const info = getWeatherInfo(weather.code);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-900/20 group">
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 opacity-10 transform scale-150 rotate-12 transition-transform duration-700 group-hover:scale-175">
        {info.icon}
      </div>
      
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner">
            {weather.loading ? (
              <div className="w-10 h-10 animate-spin rounded-full border-2 border-t-transparent border-white/50"></div>
            ) : (
              info.icon
            )}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-xs font-medium border border-white/5">
            <MapPin className="w-3 h-3" />
            <span>Lokasi Anda</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold tracking-tighter">{weather.temp}°</span>
            <span className="text-indigo-200 text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">{info.label}</span>
            <span className="text-indigo-200 text-sm opacity-80">{info.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}