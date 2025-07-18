bit2: √
url : https://github.com/django-cms/django-filer/commit/160ad7efb9146a70b7a68ad19fcf17d2ae740dac#diff-ec6621c67f2e11e4b06bdedfc4e193e2dc0cfc6e7b94d31815f49cfac594c959
file: filer/templates/admin/filer/folder/directory_listing.html
desc: add one extra space each line
diff: 
       <a href="#" id="id_upload_button" title="{% trans 'Upload Files' %}"
-          class="navigator-button navigator-button-upload js-upload-button"
-          data-url="{% url 'admin:filer-ajax_upload' folder_id=folder.id %}"
-          data-max-uploader-connections="{{ uploader_connections }}"
-          data-max-files="{{ max_files|safe }}"
-          {% if max_filesize %}data-max-filesize="{{ max_filesize|safe }}"{% endif %}
+           class="navigator-button navigator-button-upload js-upload-button"
+           data-url="{% url 'admin:filer-ajax_upload' folder_id=folder.id %}"
+           data-max-uploader-connections="{{ uploader_connections }}"
+           data-max-files="{{ max_files|safe }}"
+           {% if max_filesize %}data-max-filesize="{{ max_filesize|safe }}"{% endif %}
       >