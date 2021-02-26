# Get the params in a URL after the `?`
#
# @param [Object] request the mostRecentAjaxRequest() from jasmine-Ajax
# @return [String] the request query params
window.requestParams = (request) ->
  decodeURIComponent(request.url.split('?')[1])
