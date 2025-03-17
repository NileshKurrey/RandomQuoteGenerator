# 🌟 Random Quote Generator  

## 📝 Introduction and Overview  

The **Random Quote Generator** is a simple yet powerful website that generates a **random quote** along with a **random background image** every time the user clicks on the **"Click to Generate Quote"** button. 🎭✨  

### 🎯 Key Features:  
✅ **Generate** random quotes with a dynamic background image  
✅ **Copy** quotes to clipboard 📋  
✅ **Download** quotes as images 📸  
✅ **Share** quotes directly on **Twitter** 🐦  

---

## 🛠️ Tech Stack  

- **Frontend:** HTML, CSS, JavaScript  
- **APIs Used:**  
  - **Free API**: Generates random quotes 🗣️  
  - **Unsplash API**: Fetches random background images 🖼️  
- **Libraries Used:**  
  - **html2canvas**: Converts the generated quote element into a JPEG for downloading as an image 📷  

---

## ✨ Features  

### 📜 1. Random Quote Generation  
- Fetches a new **quote** from an external API every time the button is clicked.  
- Ensures a unique quote is displayed on each click.  

### 🎨 2. Dynamic Background Image  
- Uses the **Unsplash API** to fetch a new **random background image** for every quote.  
- Enhances the visual appeal of each generated quote.  

### 📋 3. Copy to Clipboard  
- Allows users to **copy** the generated quote with one click.  

### 📥 4. Download as Image  
- Converts the **quote & background image** into a **JPEG file** for saving locally.  

### 🐦 5. Share on Twitter  
- Users can directly **share** the generated quote on **Twitter** with a single click.  

---

## 🎨 Design Concept  

🌿 **Theme Inspiration:**  
- The UI is based on the **lush greenery** of our environment, creating a refreshing and soothing user experience 🍃🌎.  
- Simple yet elegant **typography and design** ensure ease of use.  

---

## 🔗 API Reference  

### 📜 Fetch a Random Quote  

```http
GET https://api.freeapi.app/api/v1/public/quotes/quote/random
```
```http
GET https://api.unsplash.com/photos/random/?query="query"&client_id=access_token
```
| 🔑 Parameter | 🏷️ Type    | 📖 Description                    |
| :-------- | :------- | :-------------------------------- |
| `access_token`      | `string` | **Required**. Your **Unsplash API** access token 🔑 |
|`query`|  `string` | Search term for fetching a related image 🔍

---

## 🎥 Demo

Vercel link - https://random-quote-generator-nine-sandy.vercel.app/

---


## Screenshots
📌 1. Initial Design on Page Load: -
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

📌 2. Design After Generating a Quote:
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

📌 3. Loading State:
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

--- 

## 👨‍💻 Author

- [@NileshKurrey](https://github.com/NileshKurrey)


## ⚠️ Important Note for Evaluators

🚀 This application uses the Unsplash API to fetch images. The Unsplash free plan allows only 50 API calls per hour. If you encounter an error while fetching a quote, please wait for one hour before trying again. ⏳

📢 Thank you for checking out my project! 💙✨