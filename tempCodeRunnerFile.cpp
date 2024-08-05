#include <bits/stdc++.h>
using namespace std;

// Helper function to trim whitespace from a string
string trim(string s) {
    s.erase(s.begin(), find_if(s.begin(), s.end(), [](unsigned char ch) {
        return !isspace(ch);
    }));
    s.erase(find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
        return !isspace(ch);
    }).base(), s.end());
    return s;
}

// Helper function to split a string by spaces
vector<string> splitString(string s) {
    vector<string> result;
    istringstream iss(s);
    for (string token; iss >> token; )
        result.push_back(token);
    return result;
}

int GetAnswer(int N, int M, int C, vector<vector<int>> edges, vector<int> A) {
    vector<vector<int>> tree(N + 1);
    for (const auto& edge : edges) {
        int u = edge[0];
        int v = edge[1];
        tree[u].push_back(v);
        tree[v].push_back(u);
    }

    vector<int> subtree_mex(N + 1);
    vector<bool> visited(N + 1, false);

    // Function to compute the MEX for a given set
    auto compute_mex = [](set<int>& s) {
        int mex = 0;
        while (s.find(mex) != s.end()) {
            ++mex;
        }
        return mex;
    };

    // DFS to calculate the MEX of each subtree
    function<void(int)> dfs = [&](int node) {
        visited[node] = true;
        set<int> subtree_values;
        for (int neighbor : tree[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
                subtree_values.insert(subtree_mex[neighbor]);
            }
        }
        subtree_values.insert(A[node]);
        subtree_mex[node] = compute_mex(subtree_values);
    };

    dfs(1);

    int max_sum = 0;
    for (int i = 1; i <= N; ++i) {
        for (int neighbor : tree[i]) {
            if (i < neighbor) { // Consider each edge only once
                // Sum of MEX values for the two resulting subtrees
                set<int> set1, set2;
                set1.insert(A[i]);
                set2.insert(A[neighbor]);
                for (int child : tree[i]) {
                    if (child != neighbor) set1.insert(subtree_mex[child]);
                }
                for (int child : tree[neighbor]) {
                    if (child != i) set2.insert(subtree_mex[child]);
                }
                int sum = compute_mex(set1) + compute_mex(set2);
                max_sum = max(max_sum, sum);
            }
        }
    }

    return max_sum;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);
    string inputline;

    getline(cin, inputline);
    int N = stoi(trim(inputline));

    getline(cin, inputline);
    int M = stoi(trim(inputline));

    getline(cin, inputline);
    int C = stoi(trim(inputline));

    vector<vector<int>> edges(M, vector<int>(C));
    for (int i = 0; i < M; ++i) {
        getline(cin, inputline);
        vector<string> inputArr = splitString(trim(inputline));
        for (int j = 0; j < C; ++j) {
            edges[i][j] = stoi(inputArr[j]);
        }
    }

    vector<int> A(N);
    for (int i = 0; i < N; ++i) {
        getline(cin, inputline);
        A[i] = stoi(trim(inputline));
    }

    int result = GetAnswer(N, M, C, edges, A);
    cout << result << endl;

    return 0;
}
