
import re
from bs4 import BeautifulSoup

def extract_test_fields(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    pages = soup.find_all('div', class_='pf')
    
    results = []
    for page_idx, page in enumerate(pages):
        page_num = page_idx + 1
        containers = page.find_all('div', class_=re.compile(r'^c\s'))
        for container in containers:
            text_div = container.find('div', class_=re.compile(r'^t\s'))
            if text_div:
                text = text_div.get_text(strip=True).lower()
                if text in ['test', 'tets']:
                    results.append({
                        "page": page_num,
                        "cls": " ".join(container.get('class')),
                        "inner_cls": " ".join(text_div.get('class'))
                    })
    
    return results

if __name__ == "__main__":
    fields = extract_test_fields('/home/juanda/minerva/minerva (1).html')
    import json
    with open('/home/juanda/minerva/source_test_fields.json', 'w') as f:
        json.dump(fields, f, indent=2)
    print(f"Extracted {len(fields)} fields.")
