# Security Policy

## Supported Versions

This is the original (v1) version of the Stravex Technologies website and is kept as a portfolio showcase. Active development continues in [stravex-technologies-v2](https://github.com/keshavmallawat/stravex-technologies-v2).

| Version | Supported |
| ------- | --------- |
| v1 (this repository, `main`) | Best effort |

## Reporting a Vulnerability

Please do not open a public GitHub issue for a security problem. Email the details privately to **mallawatkeshav@gmail.com** and include:

1. A clear description of the issue.
2. Steps to reproduce it.
3. The potential impact.

You can expect an acknowledgement within a few days.

## Notes

- Everything under `VITE_` in the build is bundled into the browser. The Firebase web configuration and the Cloudinary cloud name and unsigned upload preset are public by design. Access control is enforced by `firestore.rules`, not by hiding those values.
- No server-side secrets belong in this repository.

## Licence

This project is released under an All Rights Reserved licence. See [LICENSE](LICENSE).
