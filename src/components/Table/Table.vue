<template>
  <div>
    <select id="age-range" class="form-select mb-3 mt-4" v-model="currentAge">
      <option
        v-for="(ageRange, index) in ageOptions"
        :key="index"
        :value="index"
      >
        {{ ageRange }}
      </option>
    </select>
    <table id="app_table" class="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th
            v-for="(item, index) in tableDetails"
            :key="index"
            scope="col"
            :class="{
              sortable: paginatedResult.length && item['sort']['sortable'],
            }"
            @click="onSortingClick(item, index)"
          >
            <span>{{ item["title"] }}</span>
            <i
              v-if="paginatedResult.length && item['sort']['sortable']"
              class="bi ms-2"
              :class="[
                item['sort']['asc'] ? 'bi-sort-down-alt' : 'bi-sort-down',
                index === currentSort ? 'sorted' : 'unsorted',
              ]"
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="paginatedResult.length">
          <tr
            v-for="(result, index) in paginatedResult[currentPage - 1]"
            :key="index"
          >
            <td
              v-for="(item, index) in tableDetails"
              :key="index"
              :title="item['id']"
              @click="user = result"
              data-bs-toggle="modal" 
              data-bs-target="#user"
            >
              {{ result[item["id"]] }}
            </td>
          </tr>
        </template>

        <template v-else>
          <tr>
            <td colspan="4" class="no-results w-100 py-3">No results</td>
          </tr>
        </template>
      </tbody>
    </table>
    <User :user="user"/>
    <nav id="app_table_pagination" v-if="currentPage !== null">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="onPrevPageClick()"
        >
          <div class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </div>
        </li>
        <li
          v-for="(page, index) in paginationDisplayIndex"
          :key="index"
          class="page-item"
          :class="{ active: currentPage === page }"
          @click="onPageUpdate(page)"
        >
          <div class="page-link">{{ page }}</div>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === paginatedResult.length }"
          @click="onNextPageClick()"
        >
          <div class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import User from './User.vue'
import userData from "../../data/quiz.json";
import DATA from "../../data/data";

export default {
  components: {
    User
  },
  data () {
    return {
      tableDetails: DATA.TABLE_DETAILS,
      ageOptions: DATA.AGE_OPTIONS,
      userData: userData,
      currentPage: 1,
      currentSort: null,
      currentAge: 0,
      paginationDisplayIndex: [],
      paginatedResult: [],
      user: {}
    }
  },
  created () {
    this.paginatedResult = this.dataChunking(this.userData);
    this.paginationDisplayIndex = this.indexPagintaion();
  },
  watch: {
    currentPage () {
      this.paginationDisplayIndex = this.indexPagintaion();
    },
    currentAge (age) {
      this.filterByAge(age);
      this.currentPage = this.paginatedResult.length > 1 ? 1 : null;
      if (this.currentSort !== null) {
        this.tableDetails[this.currentSort]["sort"]["asc"] = false;
        this.currentSort = null;
      }
    }
  },
  methods: {
    onSortingClick (item, index) {
      if (!item["sort"]["sortable"]) return false;
        if (item["sort"]["sorted"]) {
          this.tableDetails[index]["sort"]["asc"] =
            !this.tableDetails[index]["sort"]["asc"];
        } else {
          item["sort"]["sorted"] = true;
        }
        if (this.currentSort !== index) {
          if (this.currentSort !== null)
            this.tableDetails[this.currentSort]["sort"]["asc"] = false;
          this.currentSort = index;
        }
        this.paginatedResult = this.dataChunking(this.sortUser(item["sort"]["asc"]));
        // this.currentPage = 1; Not sure if we should go back to page 1
    },
    sortUser (sortDir) {
        return this.paginatedResult.flat().sort((a, b) => {
        let modifier = 1;
        const sortId = this.tableDetails[this.currentSort]["id"];
        if (!sortDir) modifier = -1;
        if (a[sortId] < b[sortId]) return -1 * modifier;
        if (a[sortId] > b[sortId]) return 1 * modifier;
        return 0;
      });
    },
    filterByAge (ageRange) {
      switch (ageRange) {
        case 0:
          this.paginatedResult = this.dataChunking(this.userData);
          break;
        case 1:
          this.paginatedResult = this.dataChunking(
            this.userData.filter((user) => user.age < 18)
          );
          break;
        case 2:
          this.paginatedResult = this.dataChunking(
            this.userData.filter((user) => user.age >= 18 && user.age <= 25)
          );
          break;
        case 3:
          this.paginatedResult = this.dataChunking(
            this.userData.filter((user) => user.age > 25 && user.age <= 40)
          );
          break;
        case 4:
          this.paginatedResult = this.dataChunking(
            this.userData.filter((user) => user.age > 41 && user.age <= 60)
          );
          break;
        case 5:
          this.paginatedResult = this.dataChunking(
            this.userData.filter((user) => user.age > 61 && user.age <= 80)
          );
          break;
        case 6:
          this.paginatedResult = this.dataChunking(
            this.userData.filter((user) => user.age > 80)
          );
          break;
        default:
          break;
      }
    },
    dataChunking (data) {
      const chunkSize = 20;

      return data.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
    },
    indexPagintaion () {
      const pageMargin =
        this.paginatedResult.length >= 5 ? 5 : this.paginatedResult.length;

      if (pageMargin >= 5) {
        return Array(pageMargin)
          .fill()
          .map((x, i) => {
            if (this.currentPage < 3) return i + 1;
            if (this.currentPage >= this.paginatedResult.length - 1)
              return this.paginatedResult.length - 4 + i;
            return this.currentPage - 2 + i;
          });
      } else {
        return Array(pageMargin)
          .fill()
          .map((x, i) => i);
      }
    },
    onPageUpdate (pageIndex) {
      if (this.currentPage === pageIndex) return false;
      this.currentPage = pageIndex;
    },
    onPrevPageClick () {
      if (this.currentPage === 1) return false;
      this.currentPage -= 1;
    },
    onNextPageClick () {
      if (this.currentPage === this.paginatedResult.length) return false;
      this.currentPage += 1;
    }
  }
}
</script>

<style lang="less">
#age-range {
  width: 200px;
  margin-left: auto;
}

#app_table {
  thead th {
    &.sortable {
      cursor: pointer;
      &:hover {
        background-color: rgba(256, 256, 256, 0.1);
      }

      i.unsorted {
        color: grey;
      }
    }
  }
  tbody tr {
    cursor: pointer;
  }
  .no-results {
    text-align: center;
    font-size: 1.25rem;
  }
}
#app_table_pagination {
  .page-item {
    cursor: pointer;
    user-select: none;
    &:hover {
      .page-link {
        color: #aed5ca;
      }
    }
    .page-link {
      color: #ffffff;
      background-color: transparent;
      border: none;
      font-size: 1.2rem;
      padding: 0.375rem 1rem;
      &:focus {
        box-shadow: none;
      }
    }
    &.active {
      .page-link {
        color: #2ed2a2;
      }
    }
    &.disabled {
      cursor: default;
      .page-link {
        color: grey;
      }
    }
  }
}
</style>