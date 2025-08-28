/*
  This file implements a simple matrimonial portfolio using React 18
  and Tailwind CSS. The application is composed from several
  components: a profile card with a placeholder avatar, an image
  carousel for the photo album, expandable sections for basic
  information and family details, and an about section. Because
  external network access is limited in this environment, no
  external images are loaded – the carousel uses grey boxes with
  slide numbers instead. Users can replace the `images` array with
  actual image URLs if desired.

  The code is written in plain JavaScript and JSX, transpiled at
  runtime using Babel. For production you should precompile the
  JSX and minify the JavaScript.
*/

const { useState } = React;

/**
 * A simple image carousel. It accepts an array of images and
 * displays one at a time with previous/next controls and dot
 * indicators. For this example the images array consists of
 * placeholders and so each slide is rendered as a grey box with
 * its index. To use real images replace the objects in the
 * `images` array below with objects containing `src` and `alt`
 * properties and update the rendering logic accordingly.
 */
function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const prev = () => setIndex((index - 1 + total) % total);
  const next = () => setIndex((index + 1) % total);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg">
        {images.map((img, i) => (
          <div
            key={i}
            className={`w-full ${index === i ? 'block' : 'hidden'}`}
          >
            {/*
              If you supply actual image URLs you can replace the
              following div with an <img> element. For example:
              <img src={img.src} alt={img.alt || ''} className="w-full h-48 object-cover" />
            */}
            <div className="h-48 sm:h-60 bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-medium">
              Slide {i + 1}
            </div>
          </div>
        ))}
      </div>
      {/* Previous button */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-600 rounded-full h-8 w-8 flex items-center justify-center shadow"
        aria-label="Previous slide"
      >
        &lt;
      </button>
      {/* Next button */}
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-600 rounded-full h-8 w-8 flex items-center justify-center shadow"
        aria-label="Next slide"
      >
        &gt;
      </button>
      {/* Dot indicators */}
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full focus:outline-none ${
              i === index ? 'bg-red-500' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * ExpandableSection renders a card with a title and children. When
 * the title bar is clicked the section toggles between collapsed
 * and expanded states. A plus symbol becomes a minus when open.
 */
function ExpandableSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {title}
        </h2>
        <span className="text-red-500 text-2xl font-bold leading-none">
          {open ? '−' : '+'}
        </span>
      </div>
      {open && <div className="px-4 pb-4 text-gray-700 text-sm sm:text-base">{children}</div>}
    </div>
  );
}

/**
 * ProfileCard displays the user's avatar, name and a link to view
 * their album. The avatar is rendered as a circular grey area
 * containing a simple silhouette icon. An onViewAlbum callback is
 * invoked when the “View Album” link is clicked.
 */
function ProfileCard({ profile }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof profile.onViewAlbum === 'function') {
      profile.onViewAlbum();
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
      <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
        {/* Simple user silhouette icon */}
        <svg
          className="h-16 w-16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
          <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"></path>
        </svg>
      </div>
      <h1 className="text-2xl font-bold mt-3 text-gray-900">
        {profile.name}
      </h1>
      <button
        onClick={handleClick}
        className="mt-1 text-red-600 hover:underline focus:outline-none"
      >
        View Album
      </button>
    </div>
  );
}

/**
 * The main application component. It assembles all the pieces of
 * the profile together and manages interactions such as scrolling
 * to the album. Feel free to customise the profileData object to
 * reflect your own information – the UI will update automatically.
 */
function App() {
  // Example data for the profile. Replace the values with real
  // details if you intend to personalise the page.
  const profileData = {
    name: 'Sample Name',
    about:
      "Hello! I'm a software engineer who enjoys exploring new technologies, travelling to new places, reading books and spending quality time with family. I believe in balancing tradition and modern values and I'm looking for a partner who shares a similar outlook on life.",
    basicInfo: {
      'Date of Birth': '30 December 1995',
      Height: "5'11\" (180 cm)",
      Community: 'Hindu, Brahmin – Halua',
      Rasi: 'Mesh (Aries)',
      Gotra: 'Kashyap',
      'Blood Group': 'B+'
    },
    familyDetails: {
      "Father's Occupation": 'Headmaster (Retired)',
      "Mother's Occupation": 'Teacher',
      Siblings: '1',
      Description:
        'We are a close‑knit family who values education, culture and mutual respect. We believe in supporting one another and maintaining a harmonious balance between tradition and modern living.'
    },
    images: [1, 2, 3, 4]
  };

  // Scroll to the album section when the “View Album” link is clicked.
  const scrollToAlbum = () => {
    const albumEl = document.getElementById('album-section');
    if (albumEl) {
      albumEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Top invocation text */}
      <header className="text-center py-4 text-red-600 font-bold text-2xl">
        ॐ श्री गणपतये नमः
      </header>
      <main className="max-w-5xl mx-auto p-4">
        {/* Top row: profile and about/album */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 w-full">
            <ProfileCard
              profile={{ name: profileData.name, onViewAlbum: scrollToAlbum }}
            />
          </div>
          <div className="md:w-2/3 w-full flex flex-col gap-4">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
                About Me
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {profileData.about}
              </p>
            </div>
            {/* Album Section */}
            <div id="album-section" className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
                Album
              </h2>
              <ImageCarousel images={profileData.images} />
            </div>
          </div>
        </div>
        {/* Basic Info expandable section */}
        <ExpandableSection title="Basic Info" defaultOpen={true}>
          <ul className="list-disc ml-4 space-y-1">
            {Object.entries(profileData.basicInfo).map(([key, value]) => (
              <li key={key} className="text-gray-700">
                <span className="font-semibold">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </ExpandableSection>
        {/* Family Details expandable section */}
        <ExpandableSection title="Family Details" defaultOpen={false}>
          <ul className="list-disc ml-4 space-y-1 mb-2">
            {Object.entries(profileData.familyDetails).map(([key, value]) => {
              if (key === 'Description') return null;
              return (
                <li key={key} className="text-gray-700">
                  <span className="font-semibold">{key}:</span> {value}
                </li>
              );
            })}
          </ul>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {profileData.familyDetails.Description}
          </p>
        </ExpandableSection>
      </main>
    </div>
  );
}

// Mount the application to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);