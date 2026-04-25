from app.models.event import Event, EventCreate


def normalise(source: str, raw: dict) -> EventCreate:
    """
    Map a raw payload from an external source (Ticketmaster, council feed, etc.)
    into a normalised EventCreate.  Each source gets its own branch.
    """
    if source == "ticketmaster":
        return _from_ticketmaster(raw)
    if source == "council":
        return _from_council(raw)
    raise ValueError(f"Unknown source: {source!r}")


def _from_ticketmaster(raw: dict) -> EventCreate:
    # TODO: map Ticketmaster Discovery API response fields
    raise NotImplementedError


def _from_council(raw: dict) -> EventCreate:
    # TODO: map council open-data feed fields
    raise NotImplementedError
