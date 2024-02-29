if (location.protocol !== 'https:') { //Redirect to HTTPS
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}