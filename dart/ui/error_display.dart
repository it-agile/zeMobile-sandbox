class ErrorDisplay {
  void showWebServiceError(HttpRequest request) {
    print('${request.status} : ${request.responseText}');
  }
}
