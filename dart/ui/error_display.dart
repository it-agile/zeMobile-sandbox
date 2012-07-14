class ErrorDisplay {
  void showWebServiceError(XMLHttpRequest request) {
    print('${request.status} : ${request.responseText}');
  }
}
