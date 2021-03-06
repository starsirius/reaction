export const ArtworkFromAuctionPreview = {
  _id: "artwork_from_preview_auction",
  sale: {
    is_preview: true,
    is_open: false,
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: null,
    is_registration_closed: false,
  },
}

export const ArtworkFromTimedAuctionRegistrationOpen = {
  _id: "artwork_from_open_non_live_auction",
  sale: {
    is_preview: false,
    is_open: true,
    is_closed: false,
    is_live_open: false,
    is_registration_closed: false,
  },
}

export const ArtworkFromTimedAuctionRegistrationClosed = {
  _id: "artwork_from_open_non_live_auction",
  sale: {
    is_preview: false,
    is_open: true,
    is_closed: false,
    is_live_open: false,
    is_registration_closed: true,
  },
}

export const ArtworkFromLiveAuctionRegistrationOpen = {
  _id: "artwork_from_open_non_live_auction",
  sale: {
    is_preview: false,
    is_open: true,
    is_closed: false,
    is_live_open: true,
    is_registration_closed: false,
  },
}

export const ArtworkFromLiveAuctionRegistrationClosed = {
  _id: "artwork_from_open_non_live_auction",
  sale: {
    is_preview: false,
    is_open: true,
    is_closed: false,
    is_live_open: true,
    is_registration_closed: true,
  },
}

export const ArtworkFromClosedAuction = {
  _id: "artwork_from_open_non_live_auction",
  sale: {
    is_preview: false,
    is_open: false,
    is_closed: true,
    is_live_open: false,
    is_registration_closed: true,
  },
}

export const NotRegisteredToBid = {
  bidder_status: {},
  bidders: [],
}

export const BidderPendingApproval = {
  bidder_status: {},
  bidders: [
    {
      id: "bidder_pending_approval",
      qualified_for_bidding: false,
    },
  ],
}

export const RegistedBidder = {
  bidder_status: {},
  bidders: [
    {
      id: "bidder_approved",
      qualified_for_bidding: true,
    },
  ],
}

export const RegistedBidderWithBids = {
  bidder_status: {
    active_bid: {
      __id: "some bid present",
    },
  },
  bidders: [{ id: "bidder_approved", qualified_for_bidding: true }],
}
