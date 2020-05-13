export function isUri(value: string): boolean {
    if (!value) return false;
  
    // check for illegal characters
    if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value)) return false;
  
    // check for hex escapes that aren't complete
    if (/%[^0-9a-f]/i.test(value) || /%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) return false;
  
    // directly from RFC 3986
    const split = value.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
  
    if (!split) return false;
  
    const [scheme, authority, path] = [split[1], split[2], split[3]];
  
    // scheme and path are required, though the path can be empty
    if (!(scheme && scheme.length && path.length >= 0)) return false;
  
    // if authority is present, the path must be empty or begin with a /
    if (authority && authority.length) {
        if (!(path.length === 0 || /^\//.test(path))) return false;
    } else {
        // if authority is not present, the path must not start with //
        if (/^\/\//.test(path)) return false;
    }
  
    // scheme must begin with a letter, then consist of letters, digits, +, ., or -
    if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase())) return false;
  
    return true;
  }