class Team {
  constructor(
    id,
    name,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    venue,
  ) {
    this.id = id;
    this.name = name;
    this.tla = tla;
    this.crestUrl = crestUrl;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.email = email;
    this.founded = founded;
    this.venue = venue;
  }

}

module.exports = Team;
