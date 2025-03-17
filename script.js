// Accessing Element

let quotescontainer = document.getElementById("quotescontainer");
let quoteBtn = document.getElementById("quoteBtn");
let intialContent = document.getElementById('intialContent')
let copyBtn = document.getElementById('copy')
let twitterBtn = document.getElementById('twitter-share')
let downloadBtn = document.getElementById('download')

//Current variables
let currentQuote = ''
let currentAuthor = ''
let currentTag = ''

//Generate Button Functionality
quoteBtn.addEventListener("click", async () => {
    //Intials
    const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
    const options = { method: "GET", headers: { accept: "application/json" } };
    let imgUrl = 'https://api.unsplash.com/photos/random/'

    //cleaning
    if (document.body.lastElementChild.classList.contains('alert')) {
        document.body.removeChild(document.body.lastElementChild)
    }
    copyBtn.classList.remove('copied')
    downloadBtn.classList.remove('downloaded')
    try {
        showLoader();
        //Fetching Random Quote
        const response = await fetch(url, options);
        const data = await response.json();

        //Fetching Random Images
        imgUrl = imgUrl + `?query=${data.data.tags[0] || 'mountains'}&client_id=${API_KEYS.Access_key}`
        imgUrl += `${imgUrl.includes('?') ? '&' : '?'}timestamp=${new Date().getTime()}`;

        const imgResponse = await fetch(imgUrl, options)
        const img = await imgResponse.json()
        if (imgResponse.ok == false) {
            hideLoader();
            quotescontainer.children[0].replaceWith(intialContent);
            toast(success = false, message = 'Error while fetching')
            return
        }
        currentQuote = data.data.content
        currentAuthor = data.data.author
        currentTag = data.data.tags[0]
        showQuotes(data, img);
        hideLoader();
        loaderFlag = false;

    } catch (error) {
        console.error(error);
        toast(success = false, message = 'Error while Fetching')
    }
});

//Twitter Button Functionality
twitterBtn.addEventListener('click', () => {
    if (document.body.lastElementChild.classList.contains('alert')) {
        document.body.removeChild(document.body.lastElementChild)
    }
    copyBtn.classList.remove('copied')
    try {
        if (quotescontainer.children[0].classList.contains('intialContent')) {
            toast(false, 'First generate a qoute')
            return
        }
        const tweetText = `"${currentQuote}" - ${currentAuthor}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&hashtags=${currentTag}`;
        twitterBtn.href = twitterUrl
    } catch (error) {
        console.error('Failed to tweet ', err);
    }

})

//Copy Button Functionality
copyBtn.addEventListener('click', () => {
    if (document.body.lastElementChild.classList.contains('alert')) {
        document.body.removeChild(document.body.lastElementChild)
    }
    copyBtn.classList.remove('copied')
    try {
        if (quotescontainer.children[0].classList.contains('intialContent')) {
            toast(false, 'First generate a qoute')
            return
        }
        window.navigator.clipboard.writeText(currentQuote)
        copyBtn.classList.add('copied')

        toast(true, 'Copied to clipboard Succesfully')
    } catch (error) {
        console.error('Failed to copy quote: ', err);
        toast(true, 'Error while copying quote')
    }
})


//download Quote with image
downloadBtn.addEventListener('click', async () => {
    if (document.body.lastElementChild.classList.contains('alert')) {
        document.body.removeChild(document.body.lastElementChild)
    }
    copyBtn.classList.remove('copied')
    try {
        if (quotescontainer.children[0].classList.contains('intialContent')) {
            toast(false, 'First generate a quote')
            return
        }
        downloadBtn.classList.add('downloaded')
        
        //Convert Html Element into canvas
        const canvas = await html2canvas(quotescontainer, {
            useCORS: true, 
            scale: 2, 
            logging: false,
            backgroundColor: null 
          });
      
          // Convert to image
          const image = canvas.toDataURL('image/png');
      
          // Create download link
          const link = document.createElement('a');
          link.download = 'quote-download.png';
          link.href = image;
          link.click();
      
        toast(true, 'Qoute Download Succesfully')
    } catch (error) {
        console.error('Failed to download quote: ', error);
        toast(true, 'Error while Downloading quote')
    }
})
//Show Qoute Functionality
function showQuotes(data, img) {

    //Creating Quote Component
    let QuoteContent = document.createElement('div')
    QuoteContent.classList.add('quote-content')

    let QuoteText = document.createElement('div')
    QuoteText.classList.add('quote-text')

    let QutoAuthor = document.createElement('div')
    QutoAuthor.classList.add('quote-author')

    //Adding Fethed Data
    quotescontainer.classList.add('quotesWhenItChange')
    quotescontainer.style.backgroundImage = `url(${img.urls.regular})`

    QuoteText.textContent = `${data.data.content}`
    QutoAuthor.textContent = `${data.data.author}`

    QuoteContent.appendChild(QuoteText)
    QuoteContent.appendChild(QutoAuthor)
    quotescontainer.children[0].replaceWith(QuoteContent)
    toast(success = true, message = 'Quotes Fetched Successfully')
}



// Utility Components Functionality

//Dynamically creates loader Component

let loader = document.createElement("div");
loader.classList.add("loader");
let leaf = document.createElement("div");
leaf.classList.add("leaf-spinner");
let text = document.createElement("p");
text.textContent = "Growing Wisdom...";
text.classList.add("loading-text");
loader.appendChild(leaf);
loader.appendChild(text);

//Show Loader
function showLoader() {
    loader.style.display = "flex";
    quotescontainer.style.backgroundImage = `url('')`
    quotescontainer.classList.remove('quotesWhenItChange')
    quotescontainer.children[0].replaceWith(loader);
}

//Hide Loader
function hideLoader() {
    loader.style.display = "none";
}

//Custom Alert Functionality
function toast(success, message) {
    //Dynamically creates Alert Message

    // Create alert container
    const alert = document.createElement('div');
    alert.className = 'alert';
    // Create alert content
    const alertContent = document.createElement('div');
    alertContent.className = 'alert-content';

    // Create icon container
    const alertIcon = document.createElement('div');
    alertIcon.className = 'alert-icon';

    // Create icon
    const icon = document.createElement('i');
    icon.className = 'fas fa-check';


    // Create message element
    const alertMessage = document.createElement('div');
    alertMessage.className = 'alert-message';
    alertMessage.id = 'alert-message';
    alertMessage.textContent = message;

    // Create progress bar container
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // Create progress element
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.id = 'progress';

    //check succes type
    if (success == false) {
        alertIcon.style.backgroundColor = '#f4618d'
        progress.style.backgroundColor = '#f4618d'
        icon.className = 'fas fa-xmark'
        alert.style.borderLeft = '4px solid #f4618d'
    }
    // Assemble components
    progressBar.appendChild(progress);
    alertContent.appendChild(alertIcon);
    alertContent.appendChild(alertMessage);
    alertIcon.appendChild(icon);
    alert.appendChild(alertContent);
    alert.appendChild(progressBar);
    // Add to DOM
    document.body.appendChild(alert);


    setTimeout(() => {
        alert.remove();
    }, 5500)
}



