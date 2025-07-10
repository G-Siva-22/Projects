from crawl4ai import *
import re
import asyncio
async def main():
    async with AsyncWebCrawler() as crawler:
        link_pattern = r'\[.?\]\((.?)\)'

        result = await crawler.arun(
            # url="https://www.amazon.in/s?k=asus+tuf+15",
            url = "https://www.flipkart.com/vivo-v29e-5g-artistic-blue-128-gb/product-reviews/itmaaa634624a459?pid=MOBGSZM9UDGBZ5GH&lid=LSTMOBGSZM9UDGBZ5GH6BRX73&marketplace=FLIPKART"
        )
        urls = re.findall(link_pattern, result.markdown)
        with open("vivo v29e.md", "w", encoding="utf-8") as file:
            file.write(result.markdown)
        print(urls)
        exit()


if __name__ == "__main__":
    asyncio.run(main())