

faultyvalues <- faultyvalues %>%
  str_replace_all(pattern = "\\(", replacement = "\\\\(") %>%
  str_replace_all(pattern = "\\)", replacement = "\\\\)")

for (i in 1:length(faultyvaluesindex)){
  master$imports2 <- master$imports2 %>%
    str_replace_all(pattern = faultyvalues[i], replacement = fixedvector[i])
}
