// const jsonld  = require('jsonld')
// const doc = {
//     "http://schema.org/name": "Manu Sporny",
//     "http://schema.org/url": {
//         "@id": "http://manu.sporny.org/"
//     },
//     "http://schema.org/image": {
//         "@id": "http://manu.sporny.org/images/manu.png"
//     }
//   };
//   const context = {
//     "name": "http://schema.org/name",
//     "homepage": {
//         "@id": "http://schema.org/url", 
//         "@type": "@id"
//     },
//     "image": {
//         "@id": "http://schema.org/image", 
//         "@type": "@id"
//     }
//   };


//   jsonld.compact(doc, context).then((compacted) => {
//     console.log(JSON.stringify(compacted, null, 2));
//   });
  
const personDoc = {
    "@context": "https://schema.org",
    "@type": "https://schema.org/Person",
    "name": "Vishwas Anand",
    "url": "https://vishwas.netlify.app/",
    "image": "https://vishwas.netlify.app/author/admin/avatar_hu885ecffc73ca9d603f6cfbf02ec70754_85745_250x250_fill_q90_lanczos_center.jpg",
    "description": "Vishwas Anand is a developer turned researcher at Imaginea Labs. His research works include in the field of Blockchain, Cryptography and Security",
    "address": {
        "@type": "https://schema.org/PostalAddress",
        "name": "Pramati Technology, Chennai",
        "addressCountry": "IN",
        "addressRegion": "Tamil Nadu",
        "addressLocality": "Perungudi",
        "streetAddress": "OMR",
        "postalCode": "803110"
    },
    "birthdate": "1993-11-16",
    "children":[
        {
            "@type": "https://schema.org/Person",
            "name": "Ani"
        }
    ],
    "jobTitle": "Software Engineer"
}

module.exports = {
    personDoc
}
  