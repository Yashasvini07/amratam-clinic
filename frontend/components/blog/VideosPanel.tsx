import { clinic } from "@/lib/clinic";

export default function VideosPanel() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      <h2 className="font-serif text-4xl text-[#264B43]">
        Videos
      </h2>

      <p className="mt-4 leading-8 text-gray-600">
        Educational videos covering holistic health, natural therapies and wellness tips.
      </p>

      <div className="mt-10 aspect-video overflow-hidden rounded-xl border border-stone-200 shadow-lg">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/videoseries?list=${clinic.socials.youtubeUploadsPlaylistId}`}
          title="Amratam Clinic videos"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

    </div>
  );
}
