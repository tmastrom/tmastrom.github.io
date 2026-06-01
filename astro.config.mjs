// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	base: "/",
	fonts: [
		{
			cssVariable: "--font-satoshi",
			name: "Satoshi",
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/Satoshi-Variable.woff2"],
						style: "normal",
						weight: "100 900"
					}
				]
			},
			provider: fontProviders.local()
		}
	],
	site: "https://tmastrom.github.io"
});
