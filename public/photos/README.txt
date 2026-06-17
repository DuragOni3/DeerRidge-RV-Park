Drop your park photos in this folder (e.g. hero.jpg, site-1.jpg, gallery-1.jpg).

To use one in the site, replace a <PhotoPlaceholder /> in the code with Next.js
<Image>, for example:

  import Image from "next/image";

  <div className="relative aspect-square">
    <Image src="/photos/gallery-1.jpg" alt="Campsite" fill className="object-cover rounded-2xl" />
  </div>

For the buck logo: add logo.svg or logo.png here and update components/Logo.jsx.
