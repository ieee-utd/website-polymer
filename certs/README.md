To re-create certificates, please use EFF certbot.

Run `sudo certbot certonly --manual --preferred-challenges=dns -d dev.ieeeutd.org`. Follow the instructions to update the DNS.

Your certificates' location should be displayed. Copy privkey.pem and cert.pem of both the API and the UI certificates to this location.
