import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for map pins
const areaIcon = (color) => new L.DivIcon({
  className: '',
  html: `<div style='background:${color};width:20px;height:20px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 6px #0002;'></div>`
});

const AreasWeServe = () => {
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  const locations = [
    { id: 1, name: "Dubai Marina & JBR", position: { top: "30%", left: "20%" }, clients: 24 },
    { id: 2, name: "Los Angeles", position: { top: "40%", left: "25%" }, clients: 18 },
    { id: 3, name: "New York", position: { top: "35%", left: "30%" }, clients: 32 },
    { id: 4, name: "Chicago", position: { top: "50%", left: "40%" }, clients: 15 },
    { id: 5, name: "Miami", position: { top: "45%", left: "50%" }, clients: 10 },
    { id: 6, name: "Atlanta", position: { top: "55%", left: "60%" }, clients: 8 },
    { id: 7, name: "Dallas", position: { top: "60%", left: "70%" }, clients: 12 },
    { id: 8, name: "Denver", position: { top: "40%", left: "75%" }, clients: 6 },
    { id: 9, name: "Seattle", position: { top: "30%", left: "80%" }, clients: 9 },
    { id: 10, name: "Phoenix", position: { top: "75%", left: "25%" }, clients: 7 },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" id="areas-we-serve">
      {/* Background Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#D27D2D]/5 blur-3xl"></div>
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#6B5D44]/5 blur-3xl"></div>

      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span
          className="text-sm uppercase tracking-wider text-[#D27D2D] mb-2 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our reach
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Areas We Serve</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our service areas include all of these geographical locations where we serve our customers across the nation.
        </p>
      </motion.div>

      {/* Map Block */}
      <motion.div
        className="bg-white rounded-xl p-6 md:p-8 shadow-xl overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Interactive Map with Pins */}
        <div className="w-full h-[340px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          <MapContainer center={[25.2048, 55.2708]} zoom={11} scrollWheelZoom={false} className="w-full h-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Dubai Area Pins (approximate coordinates) */}
            {[
              { label: "Dubai Marina & JBR", color: "#2563eb", lat: 25.0803, lng: 55.1398 }, // blue
              { label: "Downtown Dubai & Business Bay", color: "#dc2626", lat: 25.1972, lng: 55.2744 }, // red
              { label: "Jumeirah", color: "#059669", lat: 25.1934, lng: 55.2471 }, // green
              { label: "Al Wasl", color: "#f59e42", lat: 25.2069, lng: 55.2532 }, // orange
              { label: "Umm Suqeim", color: "#a21caf", lat: 25.1542, lng: 55.2096 }, // purple
              { label: "Al Quoz", color: "#0ea5e9", lat: 25.1449, lng: 55.2326 }, // sky
              { label: "Al Barsha", color: "#eab308", lat: 25.1113, lng: 55.2004 }, // yellow
              { label: "Dubai Investments Park (DIP)", color: "#14b8a6", lat: 24.9876, lng: 55.1699 }, // teal
              { label: "Jebel Ali & Surrounding Free Zones", color: "#be185d", lat: 24.9857, lng: 55.0582 }, // pink
              { label: "Dubai Silicon Oasis", color: "#2563eb", lat: 25.1212, lng: 55.3773 },
              { label: "Academic City", color: "#dc2626", lat: 25.1267, lng: 55.4065 },
              { label: "Deira", color: "#059669", lat: 25.2711, lng: 55.3170 },
              { label: "Bur Dubai", color: "#f59e42", lat: 25.2532, lng: 55.2976 },
              { label: "Rashidiya", color: "#a21caf", lat: 25.2211, lng: 55.4054 },
              { label: "Al Warqa", color: "#0ea5e9", lat: 25.2047, lng: 55.4088 },
              { label: "Mirdif", color: "#eab308", lat: 25.2216, lng: 55.4178 },
              { label: "Nad Al Sheba", color: "#14b8a6", lat: 25.1688, lng: 55.3405 },
              { label: "Meydan", color: "#be185d", lat: 25.1786, lng: 55.3295 },
              { label: "Mohammed Bin Rashid City", color: "#2563eb", lat: 25.1645, lng: 55.3142 },
              { label: "Emirates Hills", color: "#dc2626", lat: 25.0667, lng: 55.1667 },
              { label: "Arabian Ranches", color: "#059669", lat: 25.0456, lng: 55.2719 },
              { label: "Damac Hills", color: "#f59e42", lat: 25.0246, lng: 55.2541 },
              { label: "Tilal Al Ghaf", color: "#a21caf", lat: 25.0571, lng: 55.2397 },
            ].map((item, idx) => (
              <Marker
                key={item.label}
                position={[item.lat, item.lng]}
                icon={areaIcon(item.color)}
              >
                <Popup>{item.label}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>


        

        {/* Legend Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
          {[
            { color: "bg-[#D27D2D]", label: "Dubai Marina & JBR" },
            { color: "bg-gray-400", label: "Downtown Dubai & Business Bay" },
            { color: "bg-gray-300", label: "Jumeirah" },
            { color: "bg-gray-300", label: "Al Wasl " },
            { color: "bg-gray-300", label: "Umm Suqeim" },
            { color: "bg-gray-500", label: " Al Quoz " },
            { color: "bg-gray-500", label: "Al Barsha" },
            { color: "bg-gray-600", label: "Dubai Investments Park (DIP)" },
            { color: "bg-gray-700", label: "Jebel Ali & Surrounding Free Zones" },

            { color: "bg-[#D27D2D]", label: "Dubai Silicon Oasis " },
            { color: "bg-[#D27D2D]", label: " Academic City" },

            { color: "bg-gray-400", label: "Deira" },
            { color: "bg-gray-400", label: "Bur Dubai" },

            { color: "bg-gray-300", label: "Rashidiya" },
            { color: "bg-gray-300", label: "Al Warqa " },
            { color: "bg-gray-300", label: "Mirdif" },


            { color: "bg-gray-500", label: "Nad Al Sheba" },
            { color: "bg-gray-500", label: "Meydan " },
            { color: "bg-gray-500", label: " Mohammed Bin Rashid City" },



            { color: "bg-gray-600", label: "Emirates Hills" },
            { color: "bg-gray-600", label: "Arabian Ranches" },
            { color: "bg-gray-600", label: " Damac Hills" },
            { color: "bg-gray-600", label: "Tilal Al Ghaf" },



          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Stat Cards (Adjusted from 3 to 2 Columns) */}
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: <MapPin className="h-5 w-5 text-[#D27D2D]" />,
              title: "20+",
              subtitle: "Service Locations",
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D27D2D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "250+",
              subtitle: "Active Clients",
            },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-[#D27D2D]/10 p-2 rounded-full">{item.icon}</div>
              <div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AreasWeServe;
