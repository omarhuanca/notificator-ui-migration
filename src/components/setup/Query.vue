<template>
  <div>
    <v-layout column wrap>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field type="text-input" name="description" background-color="primary-50" v-model="description"
                              box label="Description *" placeholder="Description" :error-messages="descriptionError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="text-input" name="sql" background-color="primary-50" v-model="sql"
                              box label="Query *" placeholder="Query" :error-messages="sqlError">
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Query',
  data() {
    return {
      description: '',
      sql: '',
      descriptionError: '',
      sqlError: '',
    };
  },
  methods: {
    validateData() {
      let response = false;
      const error = 'This field is mandatory';
      const flagDescription = this.description.length === 0 || this.description.length > 100;
      this.descriptionError = '';
      if (flagDescription) {
        this.descriptionError = error;
      }
      const flagSql = this.sql.length === 0 || this.sql.length > 100;
      this.sqlError = '';
      if (flagSql) {
        this.sqlError = error;
      }
      if (!flagDescription && !flagSql) {
        response = true;
      }
      return response;
    },
    copyParent() {
      return {
        description: this.description,
        sql: this.sql,
      };
    },
  },
};
</script>
