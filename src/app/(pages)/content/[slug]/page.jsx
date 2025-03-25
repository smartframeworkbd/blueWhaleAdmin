/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetContentBySlugQuery } from "@/redux/Feature/content/contentApi";
import { useParams } from "next/navigation";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";

const Page = ({params}) => {
  // console.log(params.slug)
  const { data, isLoading, isSuccess } = useGetContentBySlugQuery(params.slug);

  if (isLoading) return <div className="text-center py-10"><LoadingPage/></div>;

  if (!isSuccess || !data)
    return <div className="text-center py-10">Content not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb Section with Parallax Effect */}
      {/* <div className="relative">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${data.data.imageUrl})`,
            height: "200px",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 text-center text-white py-16">
          <nav className="flex justify-center space-x-6 py-4">
            <Link
              href="/"
              className="text-lg font-medium hover:text-gray-300 transition-all duration-200"
            >
              Home
            </Link>
            <span className="text-lg text-gray-300">/</span>
            <Link
              href={`/content/${slug}`}
              className="text-lg font-medium hover:text-gray-300 transition-all duration-200"
            >
              {data.data.title}
            </Link>
          </nav>
        </div>
      </div> */}

      {/* Title & Subtitle */}
      <div className="text-center mb-10 mt-6">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight uppercase">
          {data.data.title}
        </h1>
        <p className="text-xl text-gray-600 mt-2 uppercase">{data.data.subTitle}</p>
      </div>

      {/* Image Section */}
     { 
      data?.data?.imageUrl &&
      <div className="mb-8">
        <img
         src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${ data?.data?.imageUrl}`} 
          alt={data.data.title}
          className="w-full"
          loading="lazy"
        />
      </div>
}
      {/* Description Section */}
      <div className="text-gray-700 mb-8">
        <p className="text-lg leading-relaxed">{data?.data?.description}</p>
      </div>

      {/* Video Section */}
      {data.data.videoUrl && (
        <div className="mb-8">
          <video
            controls
            className="w-full max-w-2xl mx-auto rounded-lg shadow-md transition-all duration-300"
            style={{ maxHeight: "500px", objectFit: "cover" }} // Optional: Ensures the video fits well
          >
            <source src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${ data?.data?.videoUrl}`} 

            type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* External Video Link */}
      {data.data.external_videoUrl && (
        <div className="mb-8">
          <a
            href={data.data.external_videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-lg font-medium underline transition-all duration-200"
          >
            Watch External Video
          </a>
        </div>
      )}

      {/* Action Button */}
      {data?.data?.buttonLink && (
        <div className="text-center mb-10">
          <a
            href={data.data.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300"
          >
            {data.data.buttonText || "Learn More"}
          </a>
        </div>
      )}

    </div>
  );
};

export default Page;
