"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { FeedJob } from "@/types/job";
import { formatCurrency } from "@/lib/customer/format";
import { formatDistance } from "@/data/providerMock";
import Link from "next/link";
import { ROUTES } from "@/utils/navigation";

function makeIcon(selected: boolean) {
  const size = selected ? 32 : 26;
  const bg = selected ? "#C70A24" : "#1a1208";
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bg};border:3px solid #fff;box-shadow:0 2px 8px rgba(26,18,8,0.25);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

type FeedMapInnerProps = {
  jobs: FeedJob[];
  center?: { lat: number; lng: number };
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

export default function FeedMapInner({
  jobs,
  center,
  selectedId,
  onSelect,
}: FeedMapInnerProps) {
  const mapCenter = center ??
    (jobs[0]
      ? { lat: jobs[0].location.lat, lng: jobs[0].location.lng }
      : { lat: 37.76, lng: -122.42 });

  return (
    <MapContainer
      center={[mapCenter.lat, mapCenter.lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full min-h-[280px] z-0"
      style={{ background: "#e8ddd0" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {jobs.map((job) => (
        <Marker
          key={job.id}
          position={[job.location.lat, job.location.lng]}
          icon={makeIcon(selectedId === job.id)}
          eventHandlers={{
            click: () => onSelect?.(job.id),
          }}
        >
          <Popup>
            <div className="text-sm min-w-[140px]">
              <p className="font-semibold text-ink leading-snug">{job.title}</p>
              <p className="text-xs text-muted mt-1">
                {formatDistance(job.distanceKm)} · {formatCurrency(job.budget)}
              </p>
              <Link
                href={ROUTES.PROVIDER_JOB(job.id)}
                className="text-xs font-semibold text-brand mt-2 inline-block"
              >
                View job →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
