import requests
from bs4 import BeautifulSoup
import csv

# URL ของเว็บ
url = "https://natthawutsingwan.github.io/Cckc.Stock/"

# ส่งคำขอ GET ไปยังเว็บเพื่อดึงข้อมูล HTML
response = requests.get(url)

# ตรวจสอบสถานะการเชื่อมต่อ
if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")

    # ดึงข้อมูลชื่อสินค้าและจำนวนสินค้า
    product_rows = soup.find_all('tr')  # หาทุกแถวในตาราง

    product_names = []
    product_quantities = []

    for row in product_rows:
        cols = row.find_all('td')  # หาเซลล์ในแถว
        if len(cols) >= 2:  # หากมีข้อมูลในแถว
            name = cols[0].get_text(strip=True)
            quantity = cols[1].get_text(strip=True)
            product_names.append(name)
            product_quantities.append(quantity)

    # สร้าง HTML ใหม่เพื่อแสดงข้อมูล
    html_content = "<html><head><title>Product Data</title></head><body>"
    html_content += "<h1>Product List</h1>"
    html_content += "<table border='1'><tr><th>Product Name</th><th>Quantity</th></tr>"

    for name, quantity in zip(product_names, product_quantities):
        html_content += f"<tr><td>{name}</td><td>{quantity}</td></tr>"

    html_content += "</table></body></html>"

    # บันทึก HTML ลงในไฟล์
    with open("product_data.html", "w", encoding="utf-8") as file:
        file.write(html_content)

    print("HTML file saved as product_data.html")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
